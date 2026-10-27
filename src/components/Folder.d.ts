import { ComponentType, ReactNode } from 'react';

export interface FolderProps {
  color?: string;
  backColor?: string;
  size?: number;
  mobileSize?: number;
  items?: ReactNode[];
  className?: string;
}

declare const Folder: ComponentType<FolderProps>;
export default Folder;
