import React, { useGlobal } from "reactn";
import { IonContent, IonPage, IonSpinner } from "@ionic/react";
import AppHeader from "../components/AppHeader";
import { Link } from "react-router-dom";

import OrderCard from "../components/OrderCard";

const Page: React.FC = () => {
  const [currentOrders] = useGlobal("currentOrders");

  return (
    <IonPage>
      <AppHeader />
      <IonContent>
        <div className="mt-12 mb-12">
          <div className="mx-6 text-3xl font-bold text-gray-900 font-slab">
            Orders
          </div>
          <div className="mx-6 mt-4 h-1 bg-gray-900" />
        </div>
        {currentOrders === null ? (
          <div className="w-full flex content-center justify-center">
            <IonSpinner name="dots" />
          </div>
        ) : (
          <></>
        )}
        {currentOrders?.map(currentOrder => (
          <OrderCard key={currentOrder.id} dailyOrder={currentOrder} />
        ))}
        {currentOrders && currentOrders.length === 0 ? (
          <div className="px-6 flex flex-col">
            <div className="mb-4 text-lg">You have no orders yet...</div>
            <Link to="/app/dashboard">
              <button className="rounded w-full py-4 font-bold bg-purple-800 text-white text-xl hover:bg-purple-600 tracking-widest">
                BACK TO HOME
              </button>
            </Link>
          </div>
        ) : (
          <></>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Page;
