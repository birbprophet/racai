import React, { useGlobal } from "reactn";
import {
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonButton,
  IonIcon,
  IonLoading
} from "@ionic/react";
import { refresh } from "ionicons/icons";

const Component: React.FC = () => {
  const [refresherOpen, setRefresherOpen] = useGlobal("refresherOpen");
  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            <span className="font-slab text-xl text-purple-800 font-black tracking-wider">
              RACAI
            </span>
          </IonTitle>
          <IonButtons slot="primary">
            <IonButton onClick={() => setRefresherOpen(true)}>
              <IonIcon icon={refresh.md} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonLoading
        isOpen={refresherOpen}
        onDidDismiss={() => setRefresherOpen(false)}
        message={"Refreshing..."}
        duration={252}
      />
    </>
  );
};
export default Component;
