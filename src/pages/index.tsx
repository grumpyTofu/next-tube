import type { GetServerSideProps, NextPage } from "next";
import { Grid } from "@material-ui/core";
import Dashboard from "../components/Dashboard";
import { ClientSafeProvider, getProviders, useSession } from "next-auth/client";
import Layout from "../components/layout/Layout";
import Login from "../components/Login";

interface IndexPageProps {
  providers: Record<string, ClientSafeProvider> | null;
}

const IndexPage: NextPage<IndexPageProps> = ({ providers }) => {
  const [session, loading] = useSession();
  return (
    <>
      {loading ? (
        <div>loading...</div>
      ) : (
        <>
          {session ? (
            <Layout>
              <Dashboard />
            </Layout>
          ) : (
            <Login providers={providers} />
          )}
        </>
      )}
    </>
  );
};

export const getServerSideProps: GetServerSideProps<IndexPageProps> = async (context) => {
  const providers = await getProviders();
  return {
    props: { providers },
  };
};

export default IndexPage;
