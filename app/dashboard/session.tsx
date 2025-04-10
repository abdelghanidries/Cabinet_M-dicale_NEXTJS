import { useSession } from "next-auth/react";

const MonComposant = () => {
  const { data: session } = useSession();

  const userId = session?.user.id;
  const userRole = session?.user.role;

  return (
    <div>
      <p>ID : {userId}</p>
      <p>Role : {userRole}</p>
    </div>
  );
};

export default MonComposant;
