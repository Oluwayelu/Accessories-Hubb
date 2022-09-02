import { useAppSelector } from "hooks/useReactRedux";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

import { Landing } from "layout";
import dynamic from "next/dynamic";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { LOGIN } from "routes";

const Checkout = ({ session }: any) => {
  return (
    <Landing title="Checkout Page">
      <h1>Checkout</h1>
    </Landing>
  );
};

export default Checkout;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: LOGIN,
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
};
