import React, { useGlobal } from "reactn";
import { IonContent, IonPage, IonSpinner, IonLoading } from "@ionic/react";
import AppHeader from "../components/AppHeader";

import OrderCard from "../components/OrderCard";

const Page: React.FC = () => {
  const [currentOrders] = useGlobal("currentOrders");
  const [refresherOpen, setRefresherOpen] = useGlobal("refresherOpen");

  const handleNoResultsButtonOnClick = () => {
    setRefresherOpen(true);
  };

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
            <button
              onClick={handleNoResultsButtonOnClick}
              className="rounded w-full py-4 font-bold bg-purple-800 text-white text-xl hover:bg-purple-600 tracking-widest"
            >
              REFRESH PAGE
            </button>
          </div>
        ) : (
          <></>
        )}
      </IonContent>
      <IonLoading
        isOpen={refresherOpen}
        onDidDismiss={() => setRefresherOpen(false)}
        message={"Refreshing..."}
        duration={252}
      />
    </IonPage>
  );
};

export default Page;
