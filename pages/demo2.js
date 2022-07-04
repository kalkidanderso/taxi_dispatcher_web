const IndexPage = ({ products }) => {
  // console.log(products);
  return (
    <div>
      {/* <Hero title={hero.title} background={hero.background} /> */}
      {/* <ProductsGrid entries={products} /> */}
      <h2>This is it</h2>
    </div>
  );
};
// executed at build-time
// export async function getStaticProps() {
//   // fetch the content of the page from an headless CMS

//   const { hero } = await fetch("");
//   return {
//     props: { hero },
//   };
// }

// executed once for every request
export async function getServerSideProps() {
  // fetch latest products from the API
  const ress = await fetch("http://localhost:3000/api/pendingRides", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  const products = await ress.json();
  // const products = await fetchLatestProducts({ limit: 6 });
  return {
    props: { products },
  };
}

export default IndexPage;
