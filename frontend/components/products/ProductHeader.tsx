import Container from "../common/Container";

export default function ProductHeader() {
    return (
        <section className="py-14">
            <Container>
                <h1 className="text-5xl font-bold">
                    Products
                </h1>

                <p className="mt-4 max-w-2xl text-gray-600">
                    Explore our collection of premium laptops,
                    keyboards, monitors, headphones, and gaming
                    accessories.
                </p>

            </Container>
        </section>
    );
}