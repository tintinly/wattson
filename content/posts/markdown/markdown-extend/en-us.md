---
title: Markdown Extended Examples
date: 2026-03-09
tags: [Markdown]
category: Post Examples
description: An example showcasing Markdown extended syntax (GFM), including containers, alerts, diagrams, math formulas, and more.
featured: true
---

# Markdown Extensions

## Containers

Custom containers can be defined by their type, title, and content.

### Info Box Containers

```markdown
::: info
This is an info box.
:::

::: tip
This is a tip.
:::

::: warning
This is a warning.
:::

::: danger
This is a dangerous warning.
:::

::: details
This is a details block.
:::
```

::: info
This is an info box.
:::

::: tip
This is a tip.
:::

::: warning
This is a warning.
:::

::: danger
This is a dangerous warning.
:::

::: details
This is a details block.
:::

You can set a custom title by appending text after the container "type".

~~~markdown
::: danger STOP
Danger zone, do not proceed
:::
```

::: details Click to view code
```js
console.log('Hello, VitePress!')

:::
~~~

::: danger STOP
Danger zone, do not proceed
:::

::: details Click to view code
```js
console.log('Hello, VitePress!')
```
:::

## GitHub-Style Alerts

```markdown
> [!NOTE]
> Highlights important information that users should not ignore even when skimming through documents.

> [!TIP]
> Suggestive information that helps users achieve their goals more smoothly.

> [!IMPORTANT]
> Information crucial for users to achieve their goals.

> [!WARNING]
> Critical content requiring immediate user attention due to potential risks.

> [!CAUTION]
> Potential negative consequences of an action.
```

> [!NOTE]
> Highlights important information that users should not ignore even when skimming through documents.

> [!TIP]
> Suggestive information that helps users achieve their goals more smoothly.

> [!IMPORTANT]
> Information crucial for users to achieve their goals.

> [!WARNING]
> Critical content requiring immediate user attention due to potential risks.

> [!CAUTION]
> Potential negative consequences of an action.

## Special Code Blocks

### Syntax Highlighting

````md
```js{4}
export default {
  data () {
    return {
      msg: 'Highlighted!'
    }
  }
}
```
````

```js{4}
export default {
  data () {
    return {
      msg: 'Highlighted!'
    }
  }
}
```

## Emoji

There are two ways to add emoji to Markdown files: copy and paste the emoji into the Markdown-formatted text, or type *emoji shortcodes*.

```
Type emoji shortcode: :joy:

Direct copy: 😂
```

Type emoji shortcode: :joy:

Direct copy: 😂

## Superscript & Subscript

```
19^th^

H~2~O
```

19^th^

H~2~O

## Footnotes

Footnotes provide supplementary explanations to the text, created with `[^anchor text]`.

```markdown
Content requiring a footnote [^1]

[^1]: This is the footnote content
```

Content requiring a footnote [^1]

[^1]: This is the footnote content

## Task Lists

Add `- [ ]` before items in a checklist to create checkable lists.

```markdown
- [ ] Unchecked
- [x] Checked
```

- [ ] Unchecked
- [x] Checked

## Math Formulas

LaTeX is a powerful typesetting system, especially suitable for documents containing complex mathematical formulas.

When you need to insert mathematical formulas in the editor, wrap TeX or LaTeX formatted formulas with one or two dollar signs `$`.

```markdown
Inline formula: variable $x = 5$ and function $f(x) = x^2 + 2x + 1$ in text.

Block-level formula:
$$E = mc^2$$

Multi-line formula:
$$
\begin{align}
f(x) &= ax^2 + bx + c \\
f'(x)  &= 2ax + b \\
f''(x)  &= 2a
\end{align}
$$
```

Inline formula: variable $x = 5$ and function $f(x) = x^2 + 2x + 1$ in text.

Block-level formula:
$$E = mc^2$$

Multi-line formula:
$$
\begin{align}
f(x) &= ax^2 + bx + c \\
f'(x)  &= 2ax + b \\
f''(x)  &= 2a
\end{align}
$$

## Diagrams

[Mermaid](https://mermaid.js.org/#/) is a JavaScript-based diagramming and charting tool that allows you to describe diagrams using text syntax (flowcharts, sequence diagrams, Gantt charts). You can embed a Mermaid snippet in your document to generate SVG graphics.

### Flowchart

Flowcharts are used to represent processes or algorithms.

````markdown
```mermaid
flowchart TD
    A[Start] --> B{Condition}
    B -->|Yes| C[Process 1]
    B -->|No| D[Process 2]
    C --> E[End]
    D --> E
```
````

```mermaid
flowchart TD
    A[Start] --> B{Condition}
    B -->|Yes| C[Process 1]
    B -->|No| D[Process 2]
    C --> E[End]
    D --> E
```

### Sequence Diagram

Sequence diagrams show interactions between objects, arranged in chronological order.

~~~markdown
```mermaid
sequenceDiagram
    participant Client
    participant Server
    Client->>Server: Request data
    Server-->>Client: Response data
    Client->>Server: Submit form
    Server-->>Client: Acknowledge submission
```
~~~

```mermaid
sequenceDiagram
    participant Client
    participant Server
    Client->>Server: Request data
    Server-->>Client: Response data
    Client->>Server: Submit form
    Server-->>Client: Acknowledge submission
```

### Class Diagram

Class diagrams display classes, attributes, methods, and their relationships in a system.

~~~markdown
```mermaid
classDiagram
    class Animal {
        +name: string
        +age: int
        +makeSound(): void
    }
    class Dog {
        +breed: string
        +bark(): void
    }
    class Cat {
        +color: string
        +meow(): void
    }
    Animal <|-- Dog
    Animal <|-- Cat
```
~~~

```mermaid
classDiagram
    class Animal {
        +name: string
        +age: int
        +makeSound(): void
    }
    class Dog {
        +breed: string
        +bark(): void
    }
    class Cat {
        +color: string
        +meow(): void
    }
    Animal <|-- Dog
    Animal <|-- Cat
```

### Gantt Chart

Gantt charts are used for project management, showing timelines for projects, tasks, and milestones.

~~~markdown
```mermaid
gantt
    title Project Plan
    dateFormat  YYYY-MM-DD
    section Phase 1
    Requirements Analysis    :a1, 2023-01-01, 7d
    Design                   :a2, after a1, 10d
    section Phase 2
    Development              :a3, after a2, 15d
    Testing                  :a4, after a3, 5d
    Deployment               :a5, after a4, 2d
```
~~~

```mermaid
gantt
    title Project Plan
    dateFormat  YYYY-MM-DD
    section Phase 1
    Requirements Analysis    :a1, 2023-01-01, 7d
    Design                   :a2, after a1, 10d
    section Phase 2
    Development              :a3, after a2, 15d
    Testing                  :a4, after a3, 5d
    Deployment               :a5, after a4, 2d
```

### Pie Chart

Pie charts display proportional relationships in data.

~~~markdown
```mermaid
pie title Website Traffic Sources
    "Search Engines" : 45.2
    "Direct Visits" : 30.3
    "Social Media" : 24.5
```
~~~

```mermaid
pie title Website Traffic Sources
    "Search Engines" : 45.2
    "Direct Visits" : 30.3
    "Social Media" : 24.5
```

### State Diagram

State diagrams describe different states of a system or object and their transitions.

~~~markdown
```mermaid
stateDiagram-v2
    [*] --> Pending
    Pending --> Processing: Start processing
    Processing --> Completed: Finish processing
    Processing --> Cancelled: Cancel
    Completed --> [*]
    Cancelled --> [*]
```
~~~

```mermaid
stateDiagram-v2
    [*] --> Pending
    Pending --> Processing: Start processing
    Processing --> Completed: Finish processing
    Processing --> Cancelled: Cancel
    Completed --> [*]
    Cancelled --> [*]
```

### Entity Relationship Diagram

ER diagrams are used for database design, showing entities and their relationships.

~~~markdown
```mermaid
erDiagram
    User ||--o{ Order : places
    Order ||--|{ Product : contains
    User {
        int id
        string name
        string email
    }
    Order {
        int id
        date created_at
        float total
    }
    Product {
        int id
        string name
        float price
    }
```
~~~

```mermaid
erDiagram
    User ||--o{ Order : places
    Order ||--|{ Product : contains
    User {
        int id
        string name
        string email
    }
    Order {
        int id
        date created_at
        float total
    }
    Product {
        int id
        string name
        float price
    }
```

### Journey Diagram

Journey diagrams show different stages and satisfaction levels in a user experience or process.

~~~markdown
```mermaid
journey
    title My working day
    section Go to work
      Make tea: 5: Me
      Go upstairs: 3: Me
      Do work: 1: Me, Cat
    section Go home
      Go downstairs: 5: Me
      Sit down: 5: Me
```
~~~

```mermaid
journey
    title My working day
    section Go to work
      Make tea: 5: Me
      Go upstairs: 3: Me
      Do work: 1: Me, Cat
    section Go home
      Go downstairs: 5: Me
      Sit down: 5: Me
```

### Git Graph

~~~markdown
```mermaid
gitGraph
   commit
   commit
   branch develop
   checkout develop
   commit
   commit
   checkout main
   merge develop
   commit
   commit
```
~~~

```mermaid
gitGraph
   commit
   commit
   branch develop
   checkout develop
   commit
   commit
   checkout main
   merge develop
   commit
   commit
```

## References

[Markdown Enhancements](https://vuepress-theme-hope.github.io/v1/md-enhance/)

[Using Mermaid Diagrams in VitePress | Jay's Blog](https://liubinfighter.github.io/Resource/Archive/mermaid-guide.html)
