import Link from "next/link";

export default function Meals() {
  return (
    <main>
      <h1 style={{ color: 'white', textAlign: 'center' }}>
        Serve your favourite meals!
      </h1>
      <p style={{ textAlign: 'center' }}><Link href="/meals/food-1">Food 1</Link></p>
      <p style={{ textAlign: 'center' }}><Link href="/meals/food-2">Food 2</Link></p>
    </main>
  );
}
