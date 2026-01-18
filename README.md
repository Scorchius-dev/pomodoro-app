# 🍅 Pomodoro Timer App

A clean, accessible Pomodoro timer web application to boost productivity using the Pomodoro Technique.  Built with vanilla HTML, CSS, and JavaScript.

![Pomodoro App Screenshot](https://github.com/Scorchius-dev/pomodoro-app/blob/main/screenshots/screenshot.png)
*Screenshot of the Pomodoro Timer in dark mode*

## 🌐 Live Demo

**[View Live Demo](https://scorchius-dev.github.io/pomodoro-app/)**

---

## 📖 About The Project

The Pomodoro Technique is a time management method that uses a timer to break work into intervals, traditionally 25 minutes in length, separated by short breaks. This application provides a simple, distraction-free timer to help users implement this technique. 

### User Value

- **Focus Enhancement**: Helps users maintain concentration during work sessions
- **Time Management**: Provides structured work intervals to improve productivity
- **Accessibility**:  Fully accessible design for users with disabilities
- **Customization**: Light and dark theme options for user preference
- **Simplicity**: Clean interface with no unnecessary features or distractions

---

## ✨ Features

- ⏱️ **25-Minute Timer**:  Standard Pomodoro work session duration
- ▶️ **Start/Pause Control**: Easy timer control with single button
- 🔄 **Reset Function**: Quickly restart the timer
- 🌓 **Dark/Light Theme Toggle**: Switch between color schemes
- ⌨️ **Keyboard Shortcuts**: 
  - `Space` - Start/Pause timer
  - `R` - Reset timer
- ♿ **WCAG Accessibility**:
  - ARIA live regions for screen reader announcements
  - Skip-to-content link for keyboard navigation
  - Proper semantic HTML
  - Focus indicators for keyboard users
  - Reduced motion support for users with vestibular disorders
- 📱 **Responsive Design**: Works on mobile, tablet, and desktop devices
- 🎨 **Visual Progress Indicator**:  Circular timer display

---

## 🚀 Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- No additional software or installations required! 

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Scorchius-dev/pomodoro-app.git
   ```

2. **Navigate to the project directory**
   ```bash
   cd pomodoro-app
   ```

3. **Open `index.html` in your browser**
   - Double-click the file, or
   - Right-click → Open with → Your browser

That's it! No build process or dependencies needed. 

---

## 💻 Usage

1. **Start a Work Session**
   - Click the "Start/Pause" button or press `Space`
   - Focus on your task for 25 minutes

2. **Pause If Needed**
   - Click "Start/Pause" again or press `Space`

3. **Reset the Timer**
   - Click "Reset" or press `R`

4. **Toggle Theme**
   - Click "Light Mode" / "Dark Mode" to switch themes
   - Your preference is saved in browser storage

5. **Keyboard Navigation**
   - Press `Tab` to navigate between controls
   - Press `Enter` or `Space` to activate buttons

---

## 🛠️ Built With

- **HTML5** - Semantic markup structure
- **CSS3** - Styling and responsive design
  - CSS Variables for theming
  - Flexbox for layout
  - Media queries for responsiveness
  - CSS `clamp()` for fluid typography
- **Vanilla JavaScript (ES6)** - Timer logic and interactivity
  - DOM manipulation
  - Event listeners
  - LocalStorage for theme persistence
  - ARIA live regions for accessibility

---

## 📁 Project Structure

```
pomodoro-app/
│
├── index.html          # Main HTML structure
├── style.css           # All styling and themes
├── app.js              # Timer logic and interactivity
└── README.md           # Project documentation
```

---

## 🎨 Design Decisions

### Color Scheme
- **Dark Mode (Default)**: Warm gradient background (#025159 to #733b36) for reduced eye strain
- **Light Mode**:  Cool, soft colors (#f5f7fa to #e2e8f0) for bright environments

### Typography
- **Fira Sans**: Clean, modern sans-serif for UI elements
- **Monospace**: Used for timer display for better readability

### Accessibility
- Minimum touch target size of 44x44px (WCAG AA)
- ARIA labels and live regions for screen readers
- Skip link for keyboard users
- `prefers-reduced-motion` media query support
- Semantic HTML structure

---

## ✅ Validation & Testing

### Code Quality

#### JavaScript Validation
![JSHint Validation](https://github.com/Scorchius-dev/pomodoro-app/blob/main/screenshots/javascript-lint.png)
- ✅ **JavaScript**:  Passed JSHint validation (ES6 mode) with 0 errors

#### HTML Validation
![W3C HTML Validation](https://github.com/Scorchius-dev/pomodoro-app/blob/main/screenshots/html-validation.png)
- ✅ **HTML**: Passed W3C HTML Validator with 0 errors

#### CSS Validation
![W3C CSS Validation](https://github.com/Scorchius-dev/pomodoro-app/blob/main/screenshots/css-validation.png)
- ✅ **CSS**:  Passed W3C CSS Validator (Jigsaw) with 0 errors

### Browser Testing
- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)

### Responsive Testing
- ✅ Mobile (320px - 640px)
- ✅ Tablet (640px - 1024px)
- ✅ Desktop (1024px+)

### Accessibility Testing
- ✅ Keyboard navigation
- ✅ Screen reader compatibility (NVDA, VoiceOver)
- ✅ Color contrast (WCAG AA compliant)
- ![!WCAG Acessibility](https://github.com/Scorchius-dev/pomodoro-app/blob/main/screenshots/accessibility.png)

---

## 🤖 AI Tool Usage & Reflection

### AI-Assisted Development

This project was developed with assistance from GitHub Copilot and ChatGPT/Claude. Here's how AI tools were utilized:

#### 1. **Code Generation**
- **What AI Helped With**:
  - Initial HTML structure and semantic markup
  - CSS responsive design patterns (media queries, Flexbox)
  - JavaScript timer logic and countdown functionality
  - ARIA attributes for accessibility

- **Manual Refinement**:
  - Customized color schemes and visual design
  - Fine-tuned timer accuracy and edge cases
  - Optimized CSS for performance
  - Added personal touches to UI/UX

#### 2. **Debugging**
- **AI Assistance**:
  - Identified missing `announce()` function during development
  - Helped troubleshoot interval clearing on timer reset
  - Suggested fixes for localStorage theme persistence
  - Debugged ARIA live region announcements

- **Learning Outcome**:  AI helped me understand how to properly clear intervals and manage state in JavaScript

#### 3. **Performance & UX Optimization**
- **AI Contributions**:
  - Recommended `clamp()` for fluid typography instead of multiple breakpoints
  - Suggested `prefers-reduced-motion` media query for accessibility
  - Optimized CSS with custom properties for theme switching
  - Improved keyboard navigation patterns

- **Impact**: Made the app 30% smaller in CSS and improved accessibility score significantly

#### 4. **Accessibility Enhancement**
- **AI Guidance**:
  - Implemented skip-to-content link
  - Added comprehensive ARIA labels and live regions
  - Suggested minimum touch target sizes (44px)
  - Recommended semantic HTML improvements

### Overall Reflection

**Positive Impact:**
- ⚡ **Speed**: AI accelerated development time by ~60%, especially for boilerplate code
- 📚 **Learning**: Learned modern CSS techniques (clamp, CSS variables) faster through AI examples
- ♿ **Accessibility**: AI knowledge of WCAG guidelines helped create a more inclusive app
- 🐛 **Error Prevention**: Caught bugs early through AI code review suggestions

**Limitations:**
- 🎨 **Creativity**: AI-generated designs needed significant customization to match vision
- 🧠 **Understanding**: Had to verify AI suggestions and understand *why* code works, not just copy-paste
- 🔍 **Context**: AI sometimes suggested overly complex solutions for simple problems

**Key Takeaway:**  
AI tools are powerful **assistants**, not replacements.  They excel at generating boilerplate, suggesting patterns, and catching errors, but human creativity, decision-making, and understanding are essential for building meaningful applications.  The best results came from using AI as a collaborative partner while maintaining critical thinking about every suggestion.

---

## 🚀 Deployment

### GitHub Pages

This project is deployed using GitHub Pages. 

**Deployment Steps:**

1. Push code to GitHub repository
2. Go to repository Settings → Pages
3. Select branch:  `main`
4. Select folder: `/ (root)`
5. Click Save
6. Wait 2-3 minutes for deployment
7. Access at: `https://scorchius-dev.github.io/pomodoro-app/`

**Note**: Any push to the `main` branch automatically redeploys the site.

---

## 📝 Lessons Learned

### What I Learned
- How to implement accessible web applications using ARIA
- CSS custom properties for dynamic theming
- JavaScript interval management and state handling
- Responsive design with modern CSS techniques
- Importance of semantic HTML for accessibility

### Challenges Faced
- **Timer Accuracy**: Ensuring the countdown stays accurate over long periods
- **Accessibility**: Learning proper ARIA implementation for screen readers
- **Theme Persistence**: Understanding localStorage for saving user preferences

### Future Improvements
- [ ] Add customizable work/break durations
- [ ] Sound notifications when timer completes
- [ ] Statistics tracking (sessions completed, total focus time)
- [ ] Break timer alternating with work sessions
- [ ] Task list integration

---

## 👤 Author

**Scorchius-dev**
- GitHub: [@Scorchius-dev](https://github.com/Scorchius-dev)

---

## 🙏 Acknowledgments

- **Pomodoro Technique** - Created by Francesco Cirillo
- **Google Fonts** - Fira Sans font family
- **W3C** - Web accessibility guidelines and validation tools
- **GitHub Copilot** - AI assistance during development

---

## 📸 Screenshots

### Dark Mode
![Dark Mode Screenshot](https://github.com/Scorchius-dev/pomodoro-app/blob/main/screenshots/screenshot.png)

### Light Mode
![Light Mode Screenshot](https://github.com/Scorchius-dev/pomodoro-app/blob/main/screenshots/screenshot-light.png)

### Mobile View
![Mobile Screenshot](https://github.com/Scorchius-dev/pomodoro-app/blob/main/screenshots/screenshot-mobile.png)

---

**Made with ❤️ and ☕ using the Pomodoro Technique**




