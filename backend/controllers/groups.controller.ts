import { Group } from '../models/group.model';
import { Request, Response } from 'express';

export const addGroup = async (req: Request, res: Response) => {
  try {
    const { title, description, currency, createdOn } = req.body;
    const creator = (req as any).userData?.userId;
    const group = new Group({
      title,
      description,
      currency,
      createdOn,
      members: [creator],
      creator,
      expenses: [],
    });

    const createdGroup = await group.save();

    res.status(201).json({
      message: 'Group added successfully',
      code: 'GROUP_ADD_SUCCESS',
      group: {
        id: createdGroup._id,
        description: createdGroup.description,
        currency: createdGroup.currency,
        createdOn: createdGroup.createdOn,
        members: createdGroup.members,
        creator: createdGroup.creator,
        expenses: createdGroup.expenses,
      },
    });
  } catch (err) {
    res.status(500).json({
      code: 'ADD_GROUP_FAILED',
      message: 'Adding new group failed',
    });
  }
};

export const getGroups = async (req: Request, res: Response) => {
  try {
    const groups = await Group.find().sort({ createdAt: -1 });
    const transformedGroups = groups.map((group) => ({
      id: group._id,
      title: group.title,
      description: group.description,
      currency: group.currency,
      createdOn: group.createdOn,
      members: group.members,
      creator: group.creator,
      expenses: group.expenses,
    }));
    const totalCount = await Group.countDocuments();

    res.status(201).json({
      code: 'GROUP_FETCH_SUCCESS',
      message: 'Groups fetched successfully',
      groups: transformedGroups,
      count: totalCount,
    });
  } catch (err) {
    res.status(500).json({
      code: 'GROUP_FETCH_FAILED',
      message: 'Fetchin groups failed',
    });
  }
};
