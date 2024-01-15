export default function DynamicPage({ params }) {
  return (
    <main>
      <h1 style={{ color: 'white', textAlign: 'center' }}>
        Dynamic page
      </h1>
      <p style={{ color: 'white', textAlign: 'center' }}>{params.slug}</p>
    </main>
  );
}