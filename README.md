# Quiz Application

This Quiz Application is a React-based web app designed to provide a seamless and interactive quiz experience. Users can answer multiple-choice questions, navigate between them, and track their progress in real-time.

## Features

- **Dynamic Questions:** Fetches 15 random questions from the [Open Trivia Database (OpenTDB)](https://opentdb.com/) API.
- **Question Navigation:** Navigate between questions easily using a responsive navigation panel.
- **Progress Tracking:** Indicates visited and attempted questions.
- **Timer:** A 30-minute countdown timer for completing the quiz.
- **Responsive Design:** Works seamlessly on both desktop and mobile devices.

## Technologies Used

- **React**: Frontend framework for building the user interface.
- **Axios**: For API requests.
- **React Router DOM**: For navigation between pages.
- **Tailwind CSS**: For responsive styling.

## Installation and Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/Prateekpsingh/QuizApp.git
   cd quiz-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open the app in your browser at `http://localhost:3000`.


## API Integration

This app uses the [Open Trivia Database API](https://opentdb.com/api_config.php) to fetch questions.

### Example API Endpoint
```
https://opentdb.com/api.php?amount=15
```


## Usage

1. Open the app in your browser.
2. Answer the questions by selecting the desired options.
3. Use the navigation panel to move between questions.
4. Keep track of the time using the countdown timer.
5. Submit the quiz to view your results.



## License

This project is licensed under the MIT License.

## Acknowledgments

- [Open Trivia Database (OpenTDB)](https://opentdb.com/) for providing the questions.
- React and Tailwind CSS communities for their excellent tools and documentation.