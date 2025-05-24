import { type ReactNode, useCallback } from "react";
import type { ActionType, ModalSize } from "@/components/modal";
import { useModalStore } from "@/stores/modal";

interface UseGlobalModalProps {
  title?: string;
  description?: string;
  actionType?: ActionType;
  actionText?: string;
  cancelText?: string;
  closeOnClickOutside?: boolean;
  modalWidth?: ModalSize;
}

export const useGlobalModal = (defaultProps?: UseGlobalModalProps) => {
  const { openModal } = useModalStore();

  const showDetail = useCallback(
    (props: {
      title?: string;
      description?: string;
      content?: ReactNode;
      data?: Record<string, any>;
      onAction?: () => void;
    }) => {
      openModal({
        ...defaultProps,
        title: props.title || defaultProps?.title || "View Details",
        description: props.description || defaultProps?.description,
        content: props.content,
        actionType: "detail",
        actionText: "Close",
        data: props.data,
        onAction: props.onAction,
      });
    },
    [defaultProps, openModal]
  );

  const showEdit = useCallback(
    (props: {
      title?: string;
      description?: string;
      content: ReactNode;
      data?: Record<string, any>;
      onAction?: () => Promise<void> | void;
    }) => {
      openModal({
        ...defaultProps,
        title: props.title || defaultProps?.title || "Edit Item",
        description: props.description || defaultProps?.description,
        content: props.content,
        actionType: "edit",
        actionText: "Save Changes",
        data: props.data,
        onAction: props.onAction,
      });
    },
    [defaultProps, openModal]
  );

  const showDelete = useCallback(
    (props: {
      title?: string;
      description?: string;
      content?: ReactNode;
      data?: Record<string, any>;
      onAction?: () => Promise<void> | void;
    }) => {
      openModal({
        ...defaultProps,
        title: props.title || defaultProps?.title || "Confirm Deletion",
        description:
          props.description ||
          defaultProps?.description ||
          "Are you sure you want to delete this item?",
        content: props.content,
        actionType: "delete",
        actionText: "Delete",
        data: props.data,
        onAction: props.onAction,
        closeOnClickOutside: false,
      });
    },
    [defaultProps, openModal]
  );

  const showCustom = useCallback(
    (props: {
      title: string;
      description?: string;
      content?: ReactNode;
      actionText?: string;
      actionType?: ActionType;
      customActionColor?: string;
      actionIcon?: ReactNode;
      data?: Record<string, any>;
      onAction?: () => Promise<void> | void;
      modalWidth?: ModalSize;
    }) => {
      openModal({
        ...defaultProps,
        ...props,
      });
    },
    [defaultProps, openModal]
  );

  return {
    showDetail,
    showEdit,
    showDelete,
    showCustom,
  };
};
