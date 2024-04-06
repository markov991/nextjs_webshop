import Layout from "@/components/layout/layout";
// import { Provider } from "react-redux";
// import store from "@/store";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <>
      {/* <Provider store={store}>
      </Provider> */}
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
