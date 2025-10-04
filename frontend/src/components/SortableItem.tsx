import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface SortableItemProps {
  id: string;
  children: React.ReactNode;
  onRemove: () => void;
  canRemove?: boolean;
}

export default function SortableItem({ id, children, onRemove, canRemove = true }: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const handleRemoveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log('Remove button clicked for item:', id);
    onRemove();
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className="flex items-center justify-between p-3 bg-gray-50 rounded-md border"
    >
      <div
        {...listeners}
        className="flex-1 cursor-move flex items-center"
      >
        <div className="mr-2 text-gray-400">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M11 18c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zm-2-8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6 4c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
          </svg>
        </div>
        <span className="font-medium">{children}</span>
      </div>
      <button
        onClick={handleRemoveClick}
        disabled={!canRemove}
        className={`ml-2 px-2 py-1 rounded ${
          canRemove
            ? 'text-red-600 hover:text-red-800 hover:bg-red-50'
            : 'text-gray-400 cursor-not-allowed'
        }`}
        title={!canRemove ? 'Cannot remove the last component from this page' : 'Remove component'}
      >
        {canRemove ? 'Remove' : 'Required'}
      </button>
    </div>
  );
}
