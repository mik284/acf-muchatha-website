'use client';

// Inspired by react-hot-toast library
import * as React from 'react';

import type { ToastActionElement, ToastProps } from '@/components/ui/toast';

// const TOAST_LIMIT = 1
const TOAST_REMOVE_DELAY = 1000000;

type ToasterToast = ToastProps & {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastActionElement;
};

let count = 0;

function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
}

type ActionType =
  | {
      type: 'ADD_TOAST';
      toast: ToasterToast;
    }
  | {
      type: 'UPDATE_TOAST';
      toast: Partial<ToasterToast>;
    }
  | {
      type: 'DISMISS_TOAST';
      toastId?: ToasterToast['id'];
    }
  | {
      type: 'REMOVE_TOAST';
      toastId?: ToasterToast['id'];
    };

function addToRemoveQueue(toastId: string) {
  setTimeout(() => {
    dispatch({
      type: 'REMOVE_TOAST',
      toastId: toastId,
    });
  }, TOAST_REMOVE_DELAY);
}

function dispatch(action: ActionType) {
  // This is a simplified implementation
  // In a real app, you'd use a state management solution
  console.log('Toast action:', action);
}

export function useToast() {
  return {
    toast: (props: ToastProps) => {
      const id = genId();
      const toast = {
        ...props,
        id,
      };
      dispatch({
        type: 'ADD_TOAST',
        toast,
      });
      addToRemoveQueue(id);
    },
    dismiss: (toastId?: ToasterToast['id']) => {
      dispatch({
        type: 'DISMISS_TOAST',
        toastId: toastId,
      });
    },
  };
}
