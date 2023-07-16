import Link from "next/link";
import Image from "next/image";

import * as Yup from "yup";
import { Formik } from "formik";
import { toast } from "react-toastify";

import db from "database";
import { Product } from "models";
import { auth } from "utils/auth";
import { useAppDispatch, useAppSelector } from "hooks";
import { addNewProduct } from "_redux/_actions/productAction";
import { Admin, Input, TextArea, Select, Button, ProductDropzone } from "components";

import type { GetServerSideProps } from "next/types";

interface Props {
  categories: any;
}

const AddNewProduct = ({ categories }: Props) => {
  const dispatch = useAppDispatch();
  const {
    upload: { images },
    product: { loading },
  } = useAppSelector((state) => state);

  return (
    <Admin title="Add New Product" goBack="/admin/products">
      <Formik
        initialValues={{
          name: "",
          // sample image before upload functioality is created
          image: [],
          price: 0,
          oldPrice: 0,
          category: "",
          brand: "",
          countInStock: 0,
          description: "",
        }}
        validationSchema={Yup.object().shape({
          name: Yup.string().required("Product name is required"),
          image: Yup.array().required("Product image is required"),
          price: Yup.number().required("Price is required"),
          oldPrice: Yup.number(),
          category: Yup.string().required("Category is required"),
          brand: Yup.string().required("Brand name is required"),
          countInStock: Yup.number().required("Inventory is required"),
          description: Yup.string()
            .min(
              100,
              "Length of description is small, you should have at leat 100 characters"
            )
            .required("Product description  is required"),
        })}
        onSubmit={async (values, { setStatus, setSubmitting }) => {
          setStatus();
          setSubmitting(true);
          console.log({ ...values, image: images });
          dispatch(addNewProduct({...values, image: images}))
          setSubmitting(false);
        }}
      >
        {({ handleSubmit, handleChange, values }) => (
          <form
            onSubmit={handleSubmit}
            className="w-full grid lg:grid-cols-2 gap-2 lg:gap-5"
          >
            <div className="w-full space-y-5">
              <div>
                <h2 className="text-lg font-semibold">Description</h2>
                <div className="w-full p-5 bg-white shadow rounded-xl space-y-2 lg:space-y-5">
                  <div className="w-full grid grid-cols-2 items-center gap-2 lg:gap-5">
                    <Input
                      formik
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                      label="Product name"
                      placeholder="Enter product name"
                    />
                    <Input
                      formik
                      name="brand"
                      value={values.brand}
                      onChange={handleChange}
                      label="Brand name"
                      placeholder="Enter brand name"
                    />
                  </div>

                  <TextArea
                    formik
                    name="description"
                    value={values.description}
                    onChange={handleChange}
                    label="Product description"
                    placeholder="Enter product description"
                  />
                </div>
              </div>

              <div className="w-full p-5 bg-white shadow rounded-xl space-y-2 lg:space-y-5">
                <div>
                  <Select
                    formik
                    name="category"
                    variant="border"
                    label="Categories"
                    value={values.category}
                    onChange={handleChange}
                    options={["Select category", ...categories]}
                  />
                  <div className="w-full inline-flex justify-end">
                    <Link href="/admin/category/add-new">
                      <a className="text-primary">add new category</a>
                    </Link>
                  </div>
                </div>
                <Input
                  formik
                  name="countInStock"
                  value={values.countInStock}
                  onChange={handleChange}
                  label="Inventory"
                />
              </div>
            </div>

            <div className="w-full space-y-5">
              <div className="w-full">
                <h2 className="text-lg font-semibold">Product Images</h2>
                <ProductDropzone images={images} />
              </div>

              <div>
                <h2 className="text-lg font-semibold">Pricing</h2>
                <div className="w-full p-5 grid grid-cols-2 items-center bg-white shadow rounded-xl gap-2 lg:gap-5">
                  <Input
                    money
                    formik
                    name="price"
                    value={values.price}
                    onChange={handleChange}
                    label="Price"
                    placeholder="Enter price"
                  />
                  <Input
                    money
                    formik
                    name="oldPrice"
                    value={values.oldPrice}
                    onChange={handleChange}
                    label="Compare price"
                    placeholder="Enter compare price"
                  />
                </div>
              </div>

              <div className="w-full flex items-center justify-between">
                <Button type="reset" variant="outline">
                  Discard
                </Button>

                <Button type="submit" loading={loading}>
                  Create Product
                </Button>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </Admin>
  );
};

export default AddNewProduct;

export const getServerSideProps: GetServerSideProps = async (context) => {
  await db.connect();
  const categories = await Product.find().distinct("category");

  return auth({
    admin: true,
    redirect: context.resolvedUrl,
    token: context.req.cookies.token,
    props: {
      categories,
    },
  });
};
