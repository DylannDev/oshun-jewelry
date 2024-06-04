type FormLinkProps = {
  children: React.ReactNode;
  onClick: React.MouseEventHandler<HTMLDivElement>;
};

const FormLink = ({ children, onClick }: FormLinkProps) => {
  return (
    <div
      className="text-sm text-center underline-offset-4 cursor-pointer"
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default FormLink;
