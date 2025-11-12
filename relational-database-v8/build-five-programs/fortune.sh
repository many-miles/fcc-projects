#!/bin/bash
# Program to tell a person's fortune

echo -e "\n~~ Fortune Teller ~~\n"

RESPONSES=("Yes" "No" "Maybe" "Outlook good" "Don't count on it" "Ask again later")

GET_FORTUNE() {
  if [[ ! $1 ]]
  then
    echo "Ask a yes or no question:"
  else
    echo "Try again. Make sure it ends with a question mark:"
  fi
}

# Start by asking for the first question
GET_FORTUNE
read QUESTION

# Loop until the question ends with a "?"
until [[ $QUESTION =~ \?$ ]]
do
  GET_FORTUNE again
  read QUESTION
done

# Once the question is valid, pick a random response
N=$(( RANDOM % 6 ))
echo -e "\n${RESPONSES[$N]}"
