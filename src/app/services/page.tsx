export default async function Services() {
    const services = await (await fetch('http://localhost:8080/api/services')).json();
    return <>Hello {JSON.stringify(services)}</>;
}
