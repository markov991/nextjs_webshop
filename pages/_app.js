import Layout from "@/components/layout/layout";
import { Provider } from "react-redux";
import { wrapper } from "@/store";
import "@/styles/globals.css";

export default function App({ Component, ...rest }) {
  const { store, props } = wrapper.useWrappedStore(rest);
  return (
    <>
      <Provider store={store}>
        <Layout>
          <Component {...props.pageProps} />
        </Layout>
      </Provider>
    </>
  );
}
