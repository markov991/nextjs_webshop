import Layout from "@/components/layout/layout";
import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";
import { wrapper } from "@/store";
import "@/styles/globals.css";

export default function App({ Component, session, ...rest }) {
  const { store, props } = wrapper.useWrappedStore(rest);

  return (
    <>
      <SessionProvider session={session}>
        <Provider store={store}>
          <Layout>
            <Component {...props.pageProps} />
          </Layout>
        </Provider>
      </SessionProvider>
    </>
  );
}
