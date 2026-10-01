# DEC15 lessons

Interactive lessons for DEC15 (University of Sydney). Plain HTML, CSS and JavaScript. No build step.

## Where things live

| To change... | Edit this file |
| --- | --- |
| Colors and fonts | `css/tokens.css` |
| A lesson's activities, wording, timings | `lessons/w2d5.js` (one file per day) |
| A YouTube link | `data/media.js` |
| Canvas links (teacher feedback etc.) | `data/media.js`, the `DEC.canvas` section |
| Which days appear on the home page | `data/course.js` |
| Reading/listening texts | `data/texts/` (protected: copy exactly from the books) |

## Teacher view

Open the site with `?teacher` before the `#`, for example:
`https://YOUR-NAME.github.io/dec15/?teacher#/w2d5`
A "Teacher view" button appears. It shows answers, teacher notes, sample tables and the Teacher's Book outcomes.
This is a convenience, not security: a student who knows the address can open it too.

## Saving

Student work is saved in each laptop's browser only. Clearing the browser deletes it.
Cloud saving with logins (Supabase) can be added later in `js/core.js` (`DEC.store`) without changing lessons.
