import React from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonItem,
  IonAvatar,
  IonLabel,
  IonCard,
  IonCardContent
} from "@ionic/react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../scripts/firebase";

const Page: React.FC = () => {
  const [user] = useAuthState(auth);
  const handleLogoutOnClick = () => auth.signOut();
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            <span className="font-slab text-xl text-purple-800 font-black tracking-wider">
              RACAI
            </span>
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonCard>
          <IonCardContent>
            <IonItem lines="none">
              <IonAvatar slot="start">
                <img
                  src={user?.photoURL || "assets/images/avatar.svg"}
                  alt="profile"
                />
              </IonAvatar>
              <IonLabel>
                <div className="text-lg">
                  {user?.displayName || "Loading..."}
                </div>
                <div className="text-sm text-gray-500">
                  {user?.email || "Loading..."}
                </div>
              </IonLabel>
            </IonItem>
          </IonCardContent>
        </IonCard>
        <div className="mx-4">
          <button
            onClick={handleLogoutOnClick}
            className="rounded w-full py-4 font-bold bg-purple-800 text-white text-xl hover:bg-purple-600 tracking-widest"
          >
            LOGOUT
          </button>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Page;
