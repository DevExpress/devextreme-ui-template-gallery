import { TreeViewTypes } from 'devextreme-react/tree-view';
import { ButtonTypes } from 'devextreme-react/button';
import List from 'devextreme-react/list';
import React from 'react';

export interface AppHeaderProps {
  menuToggleEnabled: boolean;
  title?: string;
  toggleMenu: (e: ButtonTypes.ClickEvent) => void;
  className?: string;
}

export interface SideNavigationMenuProps {
  selectedItemChanged: (e: TreeViewTypes.ItemClickEvent) => void;
  openMenu: (e: React.PointerEvent) => void;
  compactMode: boolean;
  onMenuReady: (e: TreeViewTypes.ContentReadyEvent) => void;
}

export interface UserPanelProps {
  menuMode: 'context' | 'list';
}

export interface UserMenuSectionProps {
  showAvatar?: boolean;
  listRef?: React.RefObject<List>;
}

export interface User {
  name: string;
  email: string;
  avatarUrl: string;
}

export type AuthContextType = {
  user?: User;
  signIn: (email: string, password: string) => Promise<{ isOk: boolean; data?: User; message?: string }>;
  signOut: () => void;
  loading: boolean;
};

export interface SideNavToolbarProps {
  title: string;
}

export interface SingleCardProps {
  title?: string;
  description?: string;
}

export type Handle = () => void;

interface NavigationData {
  currentPath: string;
}

export type NavigationContextType = {
  setNavigationData?: ({ currentPath }: NavigationData) => void;
  navigationData: NavigationData;
};
