import Summary from "./Summary";
import getProducts from "@/actions/getProducts";
import getOrders from "@/actions/getOrders";
import getUsers from "@/actions/getUsers";
import Container from "../components/Container";

const Admin = async () => {
  const products = await getProducts({ category: null });
  const orders = await getOrders();
  const users = await getUsers();

  return (
    <Container>
      <div className="pt-8">
        <Summary products={products} orders={orders} users={users} />
      </div>
    </Container>
  );
};

export default Admin;
