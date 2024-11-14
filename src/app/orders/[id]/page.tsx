import { wixClientServer } from "@/lib/wixClientServer";
import Link from "next/link";
import { notFound } from "next/navigation";

const OrderPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  const wixClient = await wixClientServer();

  let order;
  try {
    order = await wixClient.orders.getOrder(id);
  } catch (err) {
    return notFound();
  }

  return (
    <div className="flex flex-col h-[calc(100vh-180px)] items-center justify-center ">
      <div className="shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px] px-40 py-20">
        <h1 className="text-xl">Détails de la commande</h1>
        <div className="mt-12 flex flex-col gap-6">
          <div className="">
            <span className="font-medium">Numéro de commande: </span>
            <span>{order.number}</span>
          </div>
          <div className="">
            <span className="font-medium">Nom du destinataire: </span>
            <span>
              {order.billingInfo?.contactDetails?.firstName + " "}
              {order.billingInfo?.contactDetails?.lastName}
            </span>
          </div>
          <div className="">
            <span className="font-medium">Email: </span>
            <span>{order.buyerInfo?.email}</span>
          </div>
          <div className="">
            <span className="font-medium">Prix: </span>
            <span>{order.priceSummary?.subtotal?.amount} €</span>
          </div>
          <div className="">
            <span className="font-medium">Statut du paiement: </span>
            <span>{order.paymentStatus}</span>
          </div>
          <div className="">
            <span className="font-medium">Statut de la commande: </span>
            <span>{order.status}</span>
          </div>
          <div className="">
            <span className="font-medium">Adresse de livraison: </span>
            <span>
              {order.billingInfo?.address?.addressLine1 + " "}
              {order.billingInfo?.address?.city}
            </span>
          </div>
        </div>
      </div>
      <Link href="/" className="underline mt-6">
        Have a problem? Contact us
      </Link>
    </div>
  );
};

export default OrderPage;
