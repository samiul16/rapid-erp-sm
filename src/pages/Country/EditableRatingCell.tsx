/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Star } from "lucide-react";

interface EditableRatingCellProps {
  info: any;
  handleEdit: (rowId: string, columnId: string, value: number) => void;
}

export const EditableRatingCell = ({
  info,
  handleEdit,
}: EditableRatingCellProps) => {
  const [showPopup, setShowPopup] = useState(false);
  const [hoverRating, setHoverRating] = useState(0);
  const rating = info.getValue();

  const handleRatingChange = (newRating: number) => {
    handleEdit(info.row.id, info.column.id, newRating);
    setShowPopup(false);
  };

  return (
    <div className="relative">
      <div
        className="flex items-center cursor-pointer"
        onClick={() => setShowPopup(true)}
      >
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${
              i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
            }`}
          />
        ))}
      </div>

      {showPopup && (
        <div className="absolute z-10 bg-white dark:bg-gray-800 p-2 rounded-md shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                className="p-1"
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => handleRatingChange(star)}
              >
                <Star
                  className={`h-6 w-6 ${
                    star <= (hoverRating || rating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              </button>
            ))}
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>1 (Poor)</span>
            <span>5 (Excellent)</span>
          </div>
        </div>
      )}
    </div>
  );
};
