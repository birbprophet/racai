import React from "react";
import { IonContent, IonPage } from "@ionic/react";
import { auth, googleProvider, facebookProvider } from "../firebase";

const Page: React.FC = () => {
  const loginWithGoogle = () => auth.signInWithRedirect(googleProvider);
  const loginWithFacebook = () => auth.signInWithRedirect(facebookProvider);

  return (
    <IonPage>
      <IonContent>
        <div className="h-full flex flex-col">
          <div className="w-full px-8 py-4">
            <div className="font-slab text-2xl text-purple-800 font-black tracking-wider">
              RACAI
            </div>
          </div>
          <div className="pt-16 px-8 flex-1 bg-gray-100">
            <div className="my-4">
              <div className="text-lg text-gray-700">Just one thing...</div>
            </div>
            <div className="flex flex-col">
              <div className="text-4xl font-slab font-bold">
                Register an account
              </div>
            </div>

            <div className="mt-12">
              <div className="mb-4">
                <button
                  onClick={loginWithGoogle}
                  className="w-full py-4 font-bold bg-purple-800 text-white text-xl hover:bg-purple-600"
                >
                  LOGIN WITH GOOGLE
                </button>
              </div>
              <div className="mb-4">
                <button
                  onClick={loginWithFacebook}
                  className="w-full py-4 font-bold bg-purple-800 text-white text-xl hover:bg-purple-600"
                >
                  LOGIN WITH FACEBOOK
                </button>
              </div>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Page;
