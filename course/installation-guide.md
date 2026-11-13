# Встановлення інструментів: Windows, macOS, Linux

## Що потрібно встановити

| Інструмент | Для чого | Коли потрібен |
|---|---|---|
| Git | Робота з репозиторієм | День 1 |
| Node.js 22 або новіша | Запуск навчального застосунку | День 1 |
| Cursor | Редактор з AI-агентом | День 1 |
| Обліковий запис GitHub | Репозиторій, PR | День 1 |
| Налаштування моделі Cursor | Економія ліміту безкоштовного плану | День 1 (див. `course/cursor-model-tips.md`) |
| (опційно) Обліковий запис Figma | Макет і Figma MCP | День 3–4 |

**До курсу:** установіть Git і Node.js та надішліть ментору скріншот результату:

```bash
git --version
node -v
```

Очікується: Git 2.x і Node `v22.x` або новіша (`v24.x` теж працює; перевірено, що навчальний застосунок запускається на Node 24).

---

## Windows 10/11

### Git

Відкрийте PowerShell (Пуск → введіть «PowerShell»).

```powershell
winget install --id Git.Git -e
```

Якщо `winget` недоступний, завантажте інсталятор із https://git-scm.com/download/win і прийміть налаштування за замовчуванням.

Закрийте й знову відкрийте PowerShell:

```powershell
git --version
```

### Node.js

```powershell
winget install OpenJS.NodeJS
```

Або інсталятор із https://nodejs.org/en/download (версія 22 або новіша). Закрийте й відкрийте PowerShell:

```powershell
node -v
npm -v
```

### Cursor

Завантажте з https://cursor.com і встановіть. Увійдіть в обліковий запис.

### Налаштування Git (один раз)

```powershell
git config --global user.name "Ваше Імʼя"
git config --global user.email "you@example.com"
```

### Типові проблеми (Windows)

| Симптом | Що робити |
|---|---|
| `git` або `node` не знайдено після встановлення | Закрийте й відкрийте PowerShell заново; перезавантажте комп'ютер |
| `npm install` скаржиться на політику виконання скриптів (`running scripts is disabled`) | Виконайте в PowerShell: `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned` (дозволяє локальні скрипти для вашого користувача) |
| Немає прав адміністратора | Напишіть ментору до заняття; використайте портативні версії або запасний шлях (Download ZIP + Codespaces, якщо дозволено) |
| `SSL certificate problem` під час `git clone` / `git push` | Виконайте один раз `git config --global http.sslBackend schannel` (Git використає сховище сертифікатів Windows; допомагає за корпоративного проксі чи підміни сертифікатів) |
| Помилка про довгі шляхи під час `git clone` або `npm install` | Клонуйте проєкт ближче до кореня диска, наприклад `C:\Projects`, і виконайте один раз `git config --global core.longpaths true` |

---

## macOS

### Git

Відкрийте «Термінал» (Spotlight → «Terminal»).

```bash
xcode-select --install
```

З'явиться вікно встановлення інструментів командного рядка Apple: підтвердіть. Або, якщо у вас є Homebrew:

```bash
brew install git
```

Перевірка:

```bash
git --version
```

### Node.js

Інсталятор із https://nodejs.org/en/download (версія 22 або новіша), або через Homebrew:

```bash
brew install node@22
```

Перевірка:

```bash
node -v
npm -v
```

### Cursor

Завантажте з https://cursor.com, перетягніть у «Програми» і запустіть. Якщо macOS блокує запуск, відкрийте **Системні налаштування → Конфіденційність і безпека** і підтвердіть відкриття.

### Налаштування Git (один раз)

```bash
git config --global user.name "Ваше Імʼя"
git config --global user.email "you@example.com"
```

### Типові проблеми (macOS)

| Симптом | Що робити |
|---|---|
| `xcode-select` довго качає | Це нормально, почекайте; потрібен інтернет |
| Команда `node` не знайдена після `brew install node@22` | Дотримуйтеся підказки Homebrew щодо додавання `node@22` у `PATH`, перезапустіть термінал |
| Блокування застосунку Gatekeeper | Дозвольте в «Конфіденційність і безпека» |

---

## Linux (Debian / Ubuntu, приклад)

### Git

```bash
sudo apt update && sudo apt install -y git
git --version
```

(Fedora: `sudo dnf install -y git`.)

### Node.js 22 через nvm

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
```

Закрийте й відкрийте термінал, далі:

```bash
nvm install 22
node -v
npm -v
```

> Перед тим як виконувати скрипт з Інтернету, прочитайте його (або встановіть Node.js іншим способом, наприклад з пакетного менеджера вашого дистрибутива).

### Cursor

Завантажте з https://cursor.com (формат AppImage або `.deb`, залежно від дистрибутива) і дотримуйтеся інструкції на сайті.

### Налаштування Git (один раз)

```bash
git config --global user.name "Ваше Імʼя"
git config --global user.email "you@example.com"
```

---

## Запасні шляхи (для будь-якої ОС)

1. **Без Git:** на сторінці вашого репозиторію на GitHub натисніть **Code → Download ZIP**, розпакуйте й відкрийте розпаковану папку в Cursor. Пізніше підключите Git.
2. **Немає прав на встановлення:** напишіть ментору до заняття.
3. **GitHub Codespaces:** запуск у браузері без локальних інструментів. *Доступність для зовнішніх учасників треба підтвердити до курсу.*

## Перевірка готовності (чекліст)

- [ ] `git --version` показує версію
- [ ] `node -v` показує 22 або новіше
- [ ] Cursor запускається, ви ввійшли
- [ ] У вас є обліковий запис GitHub
- [ ] Скріншот перевірки надіслано ментору
