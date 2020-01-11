import React from "react";

const Component: React.FC<{ ingredients: string[] }> = ({ ingredients }) => {
  return (
    <>
      <div>
        <span className="text-lg font-semibold">Ingredients:</span>
      </div>
      <div className="mt-2">
        {ingredients.map(ingredient => (
          <div className="flex">
            <li />
            <span>{ingredient}</span>
          </div>
        ))}
      </div>
    </>
  );
};
export default Component;
