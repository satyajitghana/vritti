import { CodeComparison } from "./component";

const typescriptBefore = `interface User {
  name: string;
  age: number;
}

function getUser(id: number): User | null {
  const user = db.users.find(u => u.id === id);
  if (!user) {
    return null;
  }
  return user;
}`;

const typescriptAfter = `interface User {
  name: string;
  age: number;
  email: string;
  role: "admin" | "user";
}

async function getUser(id: number): Promise<User> {
  const user = await db.users.findUnique({
    where: { id },
  });
  if (!user) {
    throw new UserNotFoundError(id);
  }
  return user;
}`;

const pythonBefore = `def fetch_data(url):
    response = requests.get(url)
    data = response.json()
    result = []
    for item in data:
        if item["status"] == "active":
            result.append(item["name"])
    return result`;

const pythonAfter = `async def fetch_data(url: str) -> list[str]:
    async with httpx.AsyncClient() as client:
        response = await client.get(url)
        response.raise_for_status()
        data = response.json()
    return [
        item["name"]
        for item in data
        if item["status"] == "active"
    ]`;

const cssBefore = `.container {
  display: block;
  width: 960px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 16px;
  padding-right: 16px;
}

.card {
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}`;

const cssAfter = `.container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  max-width: 1200px;
  margin-inline: auto;
  padding-inline: clamp(1rem, 3vw, 2rem);
  gap: 1.5rem;
}

.card {
  background: hsl(var(--card));
  border: 1px solid hsl(var(--border));
  border-radius: var(--radius);
  box-shadow: var(--shadow-sm);
}`;

const reactBefore = `function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/products")
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <ul>
      {products.map(p => (
        <li key={p.id}>{p.name} - \${p.price}</li>
      ))}
    </ul>
  );
}`;

const reactAfter = `function ProductList() {
  const { data: products, isLoading } = useSuspenseQuery({
    queryKey: ["products"],
    queryFn: () => fetch("/api/products").then(r => r.json()),
  });

  if (isLoading) return <ProductSkeleton />;

  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {products.map(p => (
        <ProductCard key={p.id} product={p} />
      ))}
    </ul>
  );
}`;

const examples = [
  {
    beforeCode: typescriptBefore,
    afterCode: typescriptAfter,
    language: "typescript",
    filename: "user-service.ts",
  },
  {
    beforeCode: pythonBefore,
    afterCode: pythonAfter,
    language: "python",
    filename: "fetch_data.py",
  },
  {
    beforeCode: cssBefore,
    afterCode: cssAfter,
    language: "css",
    filename: "layout.css",
  },
  {
    beforeCode: reactBefore,
    afterCode: reactAfter,
    language: "tsx",
    filename: "ProductList.tsx",
  },
];

export default function CodeComparisonExample() {
  return (
    <div className="flex flex-col gap-8">
      {examples.map((example) => (
        <CodeComparison
          key={example.filename}
          beforeCode={example.beforeCode}
          afterCode={example.afterCode}
          language={example.language}
          filename={example.filename}
          lightTheme="github-light"
          darkTheme="github-dark"
        />
      ))}
    </div>
  );
}
