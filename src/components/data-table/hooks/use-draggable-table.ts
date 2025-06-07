import { useState, useMemo, useId } from "react";
import {
    type DragEndEvent,
    type UniqueIdentifier,
    KeyboardSensor,
    MouseSensor,
    TouchSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import type { TableRowData } from "../types";

export function useDraggableTable<TData extends TableRowData>(
    initialData: TData[],
    getItemId: (item: TData) => UniqueIdentifier,
) {
    const [data, setData] = useState(initialData);

    const sortableId = useId();

    const sensors = useSensors(useSensor(MouseSensor, {}), useSensor(TouchSensor, {}), useSensor(KeyboardSensor, {}));

    const itemIds = useMemo<UniqueIdentifier[]>(() => data.map((item) => getItemId(item)), [data, getItemId]);

    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;
        if (active && over && active.id !== over.id) {
            setData((items) => {
                const oldIndex = itemIds.indexOf(active.id);
                const newIndex = itemIds.indexOf(over.id);
                return arrayMove(items, oldIndex, newIndex);
            });
        }
    }

    const updateData = (newData: TData[]) => {
        setData(newData);
    };

    return {
        data,
        setData: updateData,
        sortableId,
        sensors,
        handleDragEnd,
        itemIds,
    };
}
