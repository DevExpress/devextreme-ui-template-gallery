import dxTreeView, { ItemClickEvent } from 'devextreme/ui/tree_view';
import { ClickEvent } from 'devextreme/ui/button';
import { EventInfo } from 'devextreme/events';
import React from 'react';

export interface HeaderProps {
  menuToggleEnabled: boolean;
  title?: string;
  toggleMenu: (e: ClickEvent) => void;
  className?: string;
}

export interface SideNavigationMenuProps {
  selectedItemChanged: (e: ItemClickEvent) => void;
  openMenu: (e: React.PointerEvent) => void;
  compactMode: boolean;
  onMenuReady: (e: EventInfo<dxTreeView>) => void;
}

export interface UserPanelProps {
  menuMode: 'context' | 'list';
}

export interface UserMenuSectionProps {
  showAvatar?: boolean;
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
