import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { cardCreateSchema, cardUpdateSchema } from '../schema/cardSchema';

const prisma = new PrismaClient();

export const create = async (req: Request, res: Response) => {
  try {
    const { error, value } = cardCreateSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { labels, ...cardData } = value;

    const userExists = await prisma.user.findUnique({
      where: { id: cardData.user_id },
    });

    if (!userExists) {
      return res.status(404).json({ error: 'User not found' });
    }

    const result = await prisma.$transaction(async (prisma) => {
      const card = await prisma.card.create({
        data: {
          ...cardData,
          due_date: new Date(cardData.due_date),
        },
      });

      if (labels && labels.length > 0) {
        await prisma.label.createMany({
          data: labels.map((labelName: string) => ({
            name: labelName,
            card_id: card.id,
          })),
        });
      }

      return card;
    });

    const createdCard = await prisma.card.findUnique({
      where: { id: result.id },
      include: { labels: true },
    });

    res.status(201).json(createdCard);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleted = async (req: Request, res: Response) => {
  try {
    const cardId = parseInt(req.params.id);
    if (isNaN(cardId)) {
      return res.status(400).json({ error: 'Invalid card ID' });
    }

    const card = await prisma.card.findUnique({
      where: { id: cardId },
    });

    if (!card) {
      return res.status(404).json({ error: 'Card not found' });
    }

    await prisma.card.delete({
      where: { id: cardId },
    });

    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const cardId = parseInt(req.params.id);
    if (isNaN(cardId)) {
      return res.status(400).json({ error: 'Invalid card ID' });
    }

    const { error, value } = cardUpdateSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { labels, ...cardData } = value;

    const existingCard = await prisma.card.findUnique({
      where: { id: cardId },
    });

    if (!existingCard) {
      return res.status(404).json({ error: 'Card not found' });
    }

    const result = await prisma.$transaction(async (prisma) => {
      const card = await prisma.card.update({
        where: { id: cardId },
        data: {
          ...cardData,
          ...(cardData.due_date && { due_date: new Date(cardData.due_date) }),
        },
      });

      if (labels) {
        await prisma.label.deleteMany({
          where: { card_id: cardId },
        });

        if (labels.length > 0) {
          await prisma.label.createMany({
            data: labels.map((labelName: string) => ({
              name: labelName,
              card_id: cardId,
            })),
          });
        }
      }

      return card;
    });

    const updatedCard = await prisma.card.findUnique({
      where: { id: result.id },
      include: { labels: true },
    });

    res.status(200).json(updatedCard);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getOne = async (req: Request, res: Response) => {
  try {
    const cardId = parseInt(req.params.id);
    if (isNaN(cardId)) {
      return res.status(400).json({ error: 'Invalid card ID' });
    }

    const card = await prisma.card.findUnique({
      where: { id: cardId },
      include: {
        labels: true,
        user: {
          select: {
            id: true,
            user_name: true,
            email: true,
          },
        },
      },
    });

    if (!card) {
      return res.status(404).json({ error: 'Card not found' });
    }

    res.status(200).json(card);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getAll = async (req: Request, res: Response) => {
  try {
    const { user_id, status } = req.query;

    const where: any = {};

    if (user_id) {
      const userId = parseInt(user_id as string);
      if (isNaN(userId)) {
        return res.status(400).json({ error: 'Invalid user ID' });
      }
      where.user_id = userId;
    }

    if (status) {
      if (!['WAITING', 'IN_PROGRESS', 'COMPLETED'].includes(status as string)) {
        return res.status(400).json({ error: 'Invalid status value' });
      }
      where.status = status;
    }

    const cards = await prisma.card.findMany({
      where,
      include: {
        labels: true,
        user: {
          select: {
            id: true,
            user_name: true,
            email: true,
          },
        },
      },
      orderBy: {
        create_at: 'desc',
      },
    });

    res.status(200).json(cards);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
