import React from 'react';
import GroupList from './GroupList';
import { Group } from '@prisma/client';

interface GroupAreaProps {
  groups: Group[]
}

const GroupArea: React.FC<GroupAreaProps> = async ({ groups }) => {
  
  return (
    // TODO give a box shadow to the right
    <GroupList groups={groups} />
  )
}

export default GroupArea;