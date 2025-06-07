
## 🔗 URL de Acesso

[https://localhost:3000/login](https://localhost:3000/login)

---

## 🔐 **Acessos Mockados**

```ts
{
  id: '1',
  name: 'Admin User',
  email: 'admin@identifica-ig.com',
  password: 'admin123',
  role: 'admin' as UserRole,
  createdAt: new Date(),
},
{
  id: '2',
  name: 'Moderator User',
  email: 'moderator@identifica-ig.com',
  password: 'moderator123',
  role: 'moderator' as UserRole,
  createdAt: new Date(),
},
{
  id: '3',
  name: 'Test User',
  email: 'user@identifica-ig.com',
  password: 'user123',
  role: 'user' as UserRole,
  createdAt: new Date(),
}
```
> ⚠️ **WARNING:** A Aplicação tambem tem algumas IG's mockadas. Mas somente apareceram se o banco de dados ficar fora do ar ou estiver vazio. **Não são IG's com informações validas são somente para realizar teste na aplicação**.

---

## 🧱 **SQL para Criação das Tabelas**

> ⚠️ **WARNING:** Este schema é apenas para referência e **não deve ser executado diretamente**. A ordem das tabelas e restrições pode não ser válida para execução.

```sql
CREATE TABLE public.cities (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  name text NOT NULL,
  country_id bigint NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT cities_pkey PRIMARY KEY (id),
  CONSTRAINT fk_country FOREIGN KEY (country_id) REFERENCES public.countries(id)
);

CREATE TABLE public.countries (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  name text NOT NULL,
  code text NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT countries_pkey PRIMARY KEY (id)
);

CREATE TABLE public.geographic_indications (
  id text NOT NULL,
  name text NOT NULL,
  description text,
  type text,
  indication_type text,
  technical_specifications text,
  location jsonb,
  product_name text,
  characteristics text NOT NULL,
  control_structure text,
  maturity_level text,
  related_entities jsonb DEFAULT '[]'::jsonb,
  social_media jsonb DEFAULT '[]'::jsonb,
  sales_channels jsonb DEFAULT '[]'::jsonb,
  observations text,
  images jsonb DEFAULT '[]'::jsonb,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  visible boolean DEFAULT true,
  documents jsonb,
  CONSTRAINT geographic_indications_pkey PRIMARY KEY (id, characteristics)
);

CREATE TABLE public.ig_suggestions (
  id text NOT NULL,
  name text NOT NULL,
  description text NOT NULL,
  type text NOT NULL,
  indication_type text NOT NULL,
  technical_specifications text NOT NULL,
  location jsonb NOT NULL,
  product_name text NOT NULL,
  characteristics text NOT NULL,
  control_structure text NOT NULL,
  maturity_level text NOT NULL,
  related_entities jsonb NOT NULL DEFAULT '[]'::jsonb,
  social_media jsonb NOT NULL DEFAULT '[]'::jsonb,
  sales_channels jsonb NOT NULL DEFAULT '[]'::jsonb,
  observations text,
  images jsonb NOT NULL DEFAULT '[]'::jsonb,
  submitted_by text NOT NULL,
  status text NOT NULL,
  admin_feedback text,
  documents jsonb NOT NULL DEFAULT '[]'::jsonb,
  CONSTRAINT ig_suggestions_pkey PRIMARY KEY (id)
);

CREATE TABLE public.profiles (
  id uuid NOT NULL,
  full_name text,
  avatar_url text,
  role text NOT NULL DEFAULT 'user'::text CHECK (role = ANY (ARRAY['user'::text, 'moderator'::text, 'admin'::text])),
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT profiles_pkey PRIMARY KEY (id),
  CONSTRAINT profiles_id_fkey FOREIGN KEY (id) REFERENCES auth.users(id)
);
```
