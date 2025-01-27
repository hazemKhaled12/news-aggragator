import Drawer from '@assets/drawer.png';

export const EmptyView = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div className="flex flex-col items-center justify-center w-full p-8 text-center">
      <img
        src={Drawer}
        alt="drawer for empty view icon"
        className="w-8 h-8 text-gray-500"
      />
      <h3 className="mt-2 text-sm font-medium text-gray-700">{title}</h3>
      <p className="mt-1 text-sm text-gray-500">{description}</p>
    </div>
  );
};
