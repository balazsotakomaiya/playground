# 🍀 Lottery Simulator

Statistically speaking, you won't win the lottery. But what if you could simulate the experience of playing the lottery?

- How long would you have to play to win?
- How much money would you spend?

## User Stories

### User Story 1

**Title:** Input Personal Lottery Numbers

**As a** user,  
**I want** to be able to input my own set of lottery numbers,  
**so that** I can play with my personal lucky numbers in the simulation.  

#### Acceptance Criteria:

- [ ] The interface provides input fields for entering up to five numbers.
- [ ] The system validates the numbers to ensure they are within the 1 to 90 range.
- [ ] The system ensures no duplicate numbers are entered for a single draw.

---

### User Story 2

**Title:** Utilize Random Number Generation

**As a** user,  
**I want** to have an option to play with a random set of numbers,  
**so that** I can simulate the experience of playing without selecting my own numbers.  

#### Acceptance Criteria:

- [ ] The application provides an option to generate a random set of five numbers.
- [ ] The generated numbers are within the 1 to 90 range.
- [ ] No duplicate numbers are generated for a single draw.

---

### User Story 3

**Title:** Adjustable Draw Speed

**As a** user,  
**I want** to be able to adjust the speed of the draws,  
**so that** I can control the pace of the simulation according to my preference.  

#### Acceptance Criteria:

- [ ] The application includes a slider for adjusting the draw speed.
- [ ] The slider has a range from 1 second to 1 millisecond.
- [ ] Changes to the slider immediately affect the speed of the draws.

---

### User Story 4

**Title:** Continuous Draw Functionality

**As a** user,  
**I want** the application to continuously draw numbers until I decide to stop,  
**so that** I can simulate an ongoing lottery experience.  

#### Acceptance Criteria:

- [ ] The application allows for a continuous draw of numbers without manual intervention.
- [ ] There is a clear option to start the continuous draw.
- [ ] There is a clear option to stop the continuous draw.

---

### User Story 5

**Title:** Display of Drawn Numbers

**As a** user,  
**I want** to see the numbers that are being drawn in real-time,  
**so that** I can monitor the results as if watching a live lottery draw.  

#### Acceptance Criteria:

- [ ] The application displays the numbers as they are drawn.
- [ ] The display updates in real-time for each draw.

---

### User Story 6

**Title:** Real-Time Statistics

**As a** user,  
**I want** to view real-time statistics on the numbers drawn,  
**so that** I can analyze patterns or frequencies immediately.  

#### Acceptance Criteria:

- [ ] The application provides a statistics section.
- [ ] The statistics update in real-time with each draw.

---

### User Story 7

**Title:** Spend Tracking

**As a** user,  
**I want** to track how much money I would have spent on tickets,  
**so that** I can understand the financial commitment of playing the lottery regularly.  

#### Acceptance Criteria:

- [ ] The application calculates the total spend based on the number of draws.
- [ ] The price per ticket is set at 300 HUF (Hungarian Forint).
- [ ] The total spend is displayed and updated with each draw.

---

### User Story 8

**Title:** Display Years Spent Playing

**As a** user,  
**I want** to see the time spent playing in terms of years,  
**so that** I can comprehend the duration of my lottery participation.  

#### Acceptance Criteria:

- [ ] The interface displays the total years spent playing, based on one draw per week.
- [ ] The years spent playing statistic is updated with each draw.
- [ ] The years spent playing statistic continues to update when the simulation is paused or resumed.

### User Story 9

**Title:** Real-time Display of Match Statistics

**As a** user,  
**I want** to see a real-time count of how many 2, 3, and 4 number matches I've had,  
**so that** I can track the performance of my numbers without explicit notifications.  

#### Acceptance Criteria:

- [ ] The application displays a real-time count of 2, 3, and 4 number matches.
- [ ] These statistics update immediately as each draw is completed.
- [ ] The display is clear and easy to read during the simulation.

---

### User Story 10

**Title:** Special Handling of a Full Match

**As a** user,  
**I want** the simulation to highlight when I achieve a full match of 5 numbers,  
**so that** I can have a clear and distinct indication of this significant event.  

#### Acceptance Criteria:

- [ ] The application pauses when the user matches all 5 numbers.
- [ ] A distinct visual or textual indication is provided for a full match.
- [ ] The time spent playing up until the full match is prominently displayed.


