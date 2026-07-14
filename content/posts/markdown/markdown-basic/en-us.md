---
title: Markdown Basic Examples
date: 2026-03-08
tags: [Markdown]
category: Post Examples
description: A tutorial and example showcasing how to write Markdown files, covering core syntax and common extensions (GFM).
featured: true
---

A tutorial and example showcasing how to write Markdown files, covering core syntax and common extensions (GFM).

# Markdown

## Markdown Overview

### Markdown

Markdown is a lightweight markup language that allows people to write structured documents using an easy-to-read, easy-to-write plain text format.

Markdown was created in 2004 by John Gruber and Aaron Swartz, and has since been widely adopted across the web.

### CommonMark

[CommonMark](https://commonmark.org/) is a strict, unambiguous syntax specification and test suite for Markdown.

Its core goal is to solve the fragmentation problem caused by the original Markdown's unclear specification, which led to numerous incompatible "dialects" and inconsistent rendering across platforms.

### GFM

GitHub Flavored Markdown, commonly abbreviated as [GFM](https://github.github.com/gfm/), is a Markdown dialect currently supported for user content on GitHub.com and GitHub Enterprise.

GFM is a strict superset of CommonMark. All features supported in GitHub user content that are not specified in the original CommonMark spec are referred to as **extensions**, and are highlighted as such.

## Table of Contents

In Markdown, generating a table of contents is simple — just add the `[TOC]` symbol at the appropriate location, and all headings defined with `#` will be compiled into the table of contents.

```markdown
[TOC]
```

[TOC]

## Headings

Markdown supports two heading formats:

Use `=` for level-1 headings and `-` for level-2 headings.

```markdown
Heading Level 1
=================

Heading Level 2
-----------------

```

Use `#` symbols.

```markdown
# Heading Level 1
## Heading Level 2
### Heading Level 3
#### Heading Level 4
##### Heading Level 5
###### Heading Level 6
```

### Heading Level 3

#### Heading Level 4

##### Heading Level 5

###### Heading Level 6

## Paragraphs

### Paragraphs

Use a blank line after a paragraph to start a new one.

```markdown
First paragraph

Second paragraph
```

First paragraph

Second paragraph

### Line Breaks

Add two or more spaces at the end of a line to create a line break, similar to using the HTML `<br>` tag.

```markdown
First line  
Second line<br>Third line
```

First line  
Second line<br>Third line

> Prefer using paragraph markers over line break markers.

## Text & Emphasis

### Italic

Italic text indicates emphasis or citation, commonly used for book titles, foreign words, etc.

Italic syntax uses a single asterisk `*` or underscore `_` around the text.

```markdown
*italic text*

_italic text_
```

*italic text*
_italic text_

> It's recommended to add spaces around emphasis markers for better readability.

### Bold

Bold text makes important information stand out.

Bold syntax uses two asterisks `**` or two underscores `__` around the text.

```markdown
**bold text**

__bold text__
```

**bold text**

__bold text__

> It's recommended to add spaces around emphasis markers for better readability.

### Bold & Italic Combined

Combine bold and italic using three asterisks `***` or three underscores `___` around the text.

```markdown
***bold italic***

___italic bold text___
```

***bold italic***
___italic bold text___

> It's recommended to add spaces around emphasis markers for better readability.

### Strikethrough

Add two tildes `~~` around text to indicate it is outdated or deleted.

```markdown
Normal text

~~Deleted text~~
```

Normal text

~~Deleted text~~

### Underline

Markdown has no built-in underline syntax, but you can use the HTML `<u>` tag.

Underlining may interfere with readability, so use it sparingly.

```markdown
<u>Underlined text</u>
```

<u>Underlined text</u>

### Highlight

Text highlighting is not standard Markdown syntax, but many extensions support it, or it can be achieved via HTML:

```
This is ==highlighted text==

This is <mark>highlighted text</mark>
```

This is ==highlighted text==

This is <mark>highlighted text</mark>

## Lists

Markdown supports ordered and unordered lists.

### Unordered Lists

Unordered lists use asterisks `*`, plus signs `+`, or hyphens `-` as list markers. Add a space after the marker, then the content.

```markdown
* Item one
* Item two
* Item three

+ Item one
+ Item two
+ Item three

- Item one
- Item two
- Item three
```

* Item one
* Item two
* Item three

+ Item one
+ Item two
+ Item three

- Item one
- Item two
- Item three

> Tips:
>
> 1. Prefer hyphens `-` as markers for visual clarity
> 2. Keep marker styles consistent within the same document

### Ordered Lists

Ordered lists use numbers followed by a period `.`.

```markdown
1. First item
2. Second item
3. Third item
```

1. First item
2. Second item
3. Third item

Markdown will automatically correct the numbering starting from the first number.

```markdown
4. Fourth item
6. Sixth item (displays as 5)
8. Eighth item (displays as 6)
```

4. Fourth item
6. Sixth item (displays as 5)
8. Eighth item (displays as 6)

### Nested Lists

To nest lists, add four spaces before the sub-list items.

```markdown
1. First item:
    - First sub-item
        1. First sub-sub-item
        2. Second sub-sub-item
    - Second sub-item
2. Second item:
    1. First sub-item
    2. Second sub-item
```

1. First item:
    - First sub-item
        1. First sub-sub-item
        2. Second sub-sub-item
    - Second sub-item
2. Second item:
    1. First sub-item
    2. Second sub-item

> Tips:
>
> 1. Sub-lists should be indented by 2–4 spaces
> 2. Keep indentation length consistent
> 3. Unlimited nesting is possible, but keeping it within 3 levels is recommended in practice

## Blockquotes

Blockquotes are used to highlight important information, quote others' views, or create visual hierarchy.

### Blockquotes

Start a paragraph with `>` followed by a **space**:

Other Markdown syntax can be used inside blockquotes.

```markdown
> This is quoted content
> This is quoted content
> This is quoted content
>
> Lists in blockquotes:
>
> 1. First item
> 2. Second item
>    1. First element
>    2. Second element
>
> Code in blockquotes:
>
> ``` bash
> echo hello world
> ```
```

> This is quoted content
> This is quoted content
> This is quoted content
>
> Lists in blockquotes:
>
> 1. First item
> 2. Second item
>    1. First element
>    2. Second element
>
> Code in blockquotes:
> ```bash
> echo hello world
> ```

### Blockquotes Inside Lists

To place a blockquote inside a list item, indent the `>` with four spaces.

```markdown
1. First item
   > Blockquote
2. Second item
   > Blockquote
```

1. First item
   > Blockquote
2. Second item
   > Blockquote

### Nested Blockquotes

One `>` is the outermost layer, two `>>` is the first nesting level.

```markdown
> Outermost
> > First nesting level
> > > Second nesting level
```

> Outermost
> > First nesting level
> > > Second nesting level

## Code

### Inline Code

Wrap a function name or code fragment in backticks.

```
We use the `print()` function in this paragraph.
```

We use the `print()` function in this paragraph.

### Escaping Backticks

When displaying backticks inside inline code, use multiple backticks to wrap them.

```
``Multiple backticks ` inside ``
```

``Multiple backticks ` inside ``

> Backslash escaping does not work inside inline code.

### Indented Code Blocks

Indented code blocks use 4 spaces or one tab.

```markdown
Normal paragraph

    This is an indented code block
    Each line is preceded by four spaces
    Original formatting is preserved

Normal paragraph
```

Normal paragraph

    This is an indented code block
    Each line is preceded by four spaces
    Original formatting is preserved

Normal paragraph

### Fenced Code Blocks

Wrap a block of code with **```** and optionally specify a language:

~~~markdown
```
Multiple lines of code
Can include blank lines
Original indentation preserved
```
```txt
Plain text
```
```java
public class TestCode() {
	public static void main(String[] args) {
		System.out.println("Hello World");
	}
}
```
```javascript
$(document).ready(function () {
    alert('RUNOOB');
});
```
~~~

```
Multiple lines of code
Can include blank lines
Original indentation preserved
```
```txt
Plain text
```
```java
public class TestCode() {
	public static void main(String[] args) {
		System.out.println("Hello World");
	}
}
```
```javascript
$(document).ready(function () {
    alert('RUNOOB');
});
```

## Links

Link syntax provides interactive navigation in Markdown documents.

### Using Brackets `[]` and Parentheses `()`

```markdown
This is a link [baidu](https://www.baidu.com "Link title")
```

This is a link [baidu](https://www.baidu.com "Link title")

### Using Angle Brackets `<>`

```markdown
This is a link <https://www.baidu.com>
```

This is a link <https://www.baidu.com>

### Automatic Link Recognition

Modern Markdown parsers generally support automatic URL and email recognition.

```markdown
URL: https://www.example.com

Email: example@email.com
```

URL: https://www.example.com
Email: example@email.com

> Automatic recognition depends on the specific Markdown parser. For compatibility, use standard link syntax.

### Reference Links

You can define links via variables, with variable assignments placed at the end of the document, similar to footnotes.

```markdown
This link uses [a] in the second brackets as the URL variable [google][g]

This link omits the second brackets, using the same text as the variable [baidu][]

[g]: http://www.google.com/
[baidu]: https://www.baidu.com/
```

This link uses [a] in the second brackets as the URL variable [google][g]

This link omits the second brackets, using the same text as the variable [baidu][]

[g]: http://www.google.com/
[baidu]: https://www.baidu.com/

### Anchor Links

Anchor links are used to jump within the same document, especially useful for long document navigation.<span id="custom-anchor"> </span >

```markdown
<span id="custom-anchor"></span >

Jump to heading [Markdown Overview](#Markdown-Overview)

Jump to [custom location](#custom-anchor)

[Back to top](#)
```

<span id="custom-anchor"> </span >

Jump to heading [Markdown Overview](#Markdown-Overview)

Jump to [custom location](#custom-anchor)

[Back to top](#)

## Comments

### Native Comments

```markdown
<!-- This is commented-out text --> 

This is uncommented text
```

<!-- This is commented-out text --> 

This is uncommented text

### Using Markdown's Own Parsing

```
[//]: (This is commented-out text)

This is uncommented text
```

[//]: (This is commented-out text)

This is uncommented text

### Hiding with HTML Styles

```
<div style="display:none"> This is commented-out text </div>

This is uncommented text
```

<div style="display:none"> This is commented-out text </div>

This is uncommented text

## Images

### Referencing and Displaying Images

Use `![Alt text](image path or URL "Image title")` to reference images.

```markdown
Local image
![markdown](assets/markdown.webp "markdown")

Remote image (image hosting)
![markdown](https://raw.githubusercontent.com/tintinly/md-notes/refs/heads/main/Markdown%20Tutorial/assets/markdown.webp)
```

Local image

![markdown](assets/markdown.webp "markdown")

Remote image (image hosting)

![markdown](https://raw.githubusercontent.com/tintinly/md-notes/refs/heads/main/Markdown%20Tutorial/assets/markdown.webp)

### Specifying Image Attributes

Markdown has no way to specify image attributes. If needed, use the HTML `<img>` tag.

```markdown
<img src="https://raw.githubusercontent.com/tintinly/md-notes/refs/heads/main/Markdown%20Tutorial/assets/markdown.webp" style="zoom:33%;" >
```

<img src="https://raw.githubusercontent.com/tintinly/md-notes/refs/heads/main/Markdown%20Tutorial/assets/markdown.webp" style="zoom:33%;" >

## Tables

Tables clearly display structured data.

### Creating Tables

Markdown tables use `|` to separate cells and `-` to separate the header row from other rows.

```markdown
| Header   | Header   | Header   |
| -------- | -------- | -------- |
| Cell     | Cell     | Cell     |
| Cell     | Cell     | Cell     |
| Cell     | Cell     | Cell     |
```

| Header   | Header   | Header   |
| -------- | -------- | -------- |
| Cell     | Cell     | Cell     |
| Cell     | Cell     | Cell     |
| Cell     | Cell     | Cell     |

**We can set table alignment:**

| Left-aligned | Right-aligned | Center-aligned |
| :----------- | ------------: | :------------: |
| Cell         |          Cell |      Cell      |
| Cell         |          Cell |      Cell      |
| Cell         |          Cell |      Cell      |

### Table Alignment

`:---` left-aligns content and header.
`---:` right-aligns content and header.
`:---:` center-aligns content and header.

```markdown
| Left-aligned | Right-aligned | Center-aligned |
| :----------- | ------------: | :------------: |
| Cell         |          Cell |      Cell      |
| Cell         |          Cell |      Cell      |
```

| Left-aligned | Right-aligned | Center-aligned |
| :----------- | ------------: | :------------: |
| Cell         |          Cell |      Cell      |
| Cell         |          Cell |      Cell      |

### Diverse Table Content

| Content               | Example                               |
| --------------------- | ------------------------------------- |
| Text emphasis         | **bold** *italic* ~~strikethrough~~ <u>underline</u> |
| Links                 | [Link](http://www.example.com)        |
| HTML character codes  | &#x2705;                              |
| Emoji shortcodes      | :stuck_out_tongue_winking_eye:        |
| Direct emoji          | 😳                                    |

### Escaping Pipe Characters

Use HTML character codes or backslash escaping to display pipe `|` characters in tables.

```markdown
| Escape Method          | Example              |
| ---------------------- | -------------------- |
| Backslash escape `\|`  | Display \| symbol     |
| Character code `&#124;` | Display &#124; symbol |
```

| Escape Method           | Example              |
| ----------------------- | -------------------- |
| Backslash escape `\|`   | Display \| symbol     |
| Character code `&#124;`  | Display &#124; symbol |

## HTML

Tags not covered by Markdown can be written directly in HTML within the document.

### Inline Tags

HTML inline tags such as `<span>`, `<cite>`, `<del>` can be used freely in Markdown paragraphs, lists, or headings. You can even forgo Markdown formatting entirely and use HTML tags instead.

```markdown
Key combinations: <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>Del</kbd>  
Bold: <b>bold text</b>  
Italic: <i>italic text</i>  
Semantic emphasis: <em>emphasized text</em>  
Superscript and subscript: <sup>superscript</sup><sub>subscript</sub>  
Link: <a href="http://www.example.com">example</a>  
Line break: First line<br>Second line
```

Key combinations: <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>Del</kbd>  
Bold: <b>bold text</b>  
Italic: <i>italic text</i>  
Semantic emphasis: <em>emphasized text</em>  
Superscript and subscript: <sup>superscript</sup><sub>subscript</sub>  
Link: <a href="http://www.example.com" target="_blank" rel="noreferrer">example</a>  
Line break: First line<br>Second line

### Block Tags

Block elements — such as `<div>`, `<table>`, `<pre>`, `<p>` — must have blank lines before and after them to separate content properly.

```markdown
This is a normal paragraph.

<table>
    <tbody>
        <tr>
            <td>Example</td>
        </tr>
    </tbody>
</table>

This is another normal paragraph.
```

This is a normal paragraph.

<table>
    <tbody>
        <tr>
            <td>Example</td>
        </tr>
    </tbody>
</table>
This is another normal paragraph.

### HTML Entities

Markdown cannot directly insert special characters, but you can copy and paste them or use HTML entities:

```
Copyright (©) — &copy;  
Registered trademark (®) — &reg;  
Trademark (™) — &trade;  
Euro (€) — &euro;  
Left arrow (←) — &larr;  
Up arrow (↑) — &uarr;  
Right arrow (→) — &rarr;  
Down arrow (↓) — &darr;  
Degree (°) — &#176;  
Pi (π) — &#960;
```

Copyright (©) — &copy;  
Registered trademark (®) — &reg;  
Trademark (™) — &trade;  
Euro (€) — &euro;  
Left arrow (←) — &larr;  
Up arrow (↑) — &uarr;  
Right arrow (→) — &rarr;  
Down arrow (↓) — &darr;  
Degree (°) — &#176;  
Pi (π) — &#960;

## Others

### Horizontal Rules

Use three or more asterisks `*` or hyphens `-` on a single line to create a horizontal rule. No other content should appear on the line.

```markdown
***

* * *

********

---

- - -

--------
```

***

* * *

**** ****

---

- - -

--------

### Escaping

To display characters that are normally used for Markdown formatting, add a backslash `\` before the character.

```markdown
| Symbol | Name                                                          |
| :----- | :------------------------------------------------------------ |
| \      | Backslash                                                     |
| `      | Backtick (see [Escaping Backticks](#Escaping-Backticks))      |
| *      | Asterisk                                                      |
| _      | Underscore                                                    |
| { }    | Curly braces                                                  |
| [ ]    | Square brackets                                               |
| ( )    | Parentheses                                                   |
| #      | Hash / Pound sign                                             |
| +      | Plus sign                                                     |
| -      | Minus sign / Hyphen                                           |
| .      | Period                                                        |
| !      | Exclamation mark                                              |
| \|     | Pipe (see [Escaping Pipe Characters](#Escaping-Pipe-Characters)) |
```

| Symbol | Name                                                          |
| :----- | :------------------------------------------------------------ |
| \      | Backslash                                                     |
| `      | Backtick (see [Escaping Backticks](#Escaping-Backticks))      |
| *      | Asterisk                                                      |
| _      | Underscore                                                    |
| { }    | Curly braces                                                  |
| [ ]    | Square brackets                                               |
| ( )    | Parentheses                                                   |
| #      | Hash / Pound sign                                             |
| +      | Plus sign                                                     |
| -      | Minus sign / Hyphen                                           |
| .      | Period                                                        |
| !      | Exclamation mark                                              |
| \|     | Pipe (see [Escaping Pipe Characters](#Escaping-Pipe-Characters)) |

> Note: Some parsers may exhibit abnormal rendering due to internal logic. For example, VitePress may swallow `{ }`, and NuxtContent MPC may swallow `[ ]`. Using additional code to restore them is recommended.

## References

[CommonMark - CommonMark Specification](https://spec.commonmark.org/)

[GitHub Flavored Markdown Spec | GFM](https://github.github.com/gfm/)

[Markdown Tutorial | Runoob](https://www.runoob.com/markdown/md-tutorial.html)

[Markdown Guide — The Simplest Markdown Syntax Guide](https://www.markdownguide.org/)
