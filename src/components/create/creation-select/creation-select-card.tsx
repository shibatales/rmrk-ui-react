import React, { ReactNode } from 'react';
import { Box } from '@chakra-ui/react';

interface IProps {
  icon: ReactNode;
  text: string;
  onClick: () => any;
}

const CreationSelectCard = ({ icon }: IProps) => <Box data-name="creation-select-card">{icon}</Box>;

export default CreationSelectCard;
