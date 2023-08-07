/* eslint-disable no-unused-vars */
import { Job, Candidate, Skill } from "../common/model.js";

/**
 * Part 1: Basic utility functions.
 *
 * The challenge is to create optimal solutions for implementing some of the
 * common utility functions that we will need to build our ATS solution.
 *
 *
 */

/**
 * Filter the given jobs list and return only jobs that start between the given
 * start and end dates.
 *
 * @param {Array<Job>} jobs
 * @param {Date} startDate
 * @param {Date} endDate
 */
const filterByDate = (jobs, startDate, endDate) => {
  const filterdJobs = [];
  for (let job of jobs) {
    if (job.startDate >= startDate && job.startDate <= endDate) {
      filterdJobs.push(job);
    }
  }

  return filterdJobs;
};

/**
 * Filter the given candidates list and return only candidates that are born
 * on or after the given date.
 *
 * @param {Array<Candidate>} candidates
 * @param {Date} date
 */
const filterByBornAfter = (candidates, date) => {
  const filterdCandidates = [];
  for (let candidate of candidates) {
    if (candidate.dateOfBirth >= date) {
      filterdCandidates.push(candidate);
    }
  }

  return filterdCandidates;
};

/**
 * Sort the given candidate list, so that candidates with most skills,
 * regardless of the levels, are at the beginning.
 *
 * @param {*} candidateList
 * @returns
 */
const orderBySkills = (candidateList) => {
  candidateList = candidateList.sort(
    (a, b) => b.skills.length - a.skills.length
  );
  return candidateList;
};

/**
 * Sort the given candidate list, so that candidates with more valuable skills,
 * are at the beginning.
 * Each skill will be weighed as follows: Expert levels count as 10, Advanced levels count as 5, Beginner levels count as 1
 *
 * @param {Array<Candidate>} candidateList
 * @returns
 */
const orderByWeightedSkills = (candidateList) => {
  for (let candidate of candidateList) {
    for (let skill of candidate.skills) {
      if (Skill.level === 0) {
        Skill.level = 1;
      } else if (Skill.level === 1) {
        Skill.level = 5;
      } else if (Skill.level === 2) {
        Skill.level = 10;
      }
    }
  }
  return candidateList.sort((a, b) => {
    const sumA = a.skills.reduce((sum, skill) => sum + skill.level, 0);
    const sumB = b.skills.reduce((sum, skill) => sum + skill.level, 0);
    return sumB - sumA;
  });
};

/**
 * Return the ratio of female/male candidates in the list
 * @param {Array<Candidate>} candidateList
 * @returns a floating point number indicating the ratio
 */
const genderRatio = (candidateList) => {
  let male,
    female,
    ratio = 0;
  for (let candidate of candidateList) {
    if (candidate.gender === "M") {
      male++;
    } else {
      female++;
    }
  }
  ratio = female / male;
  return ratio;
};

/**
 * Return the month with the highest number of jobs starting,
 * indicated by the startDate property of each Job.
 * @param {Array<Job>} jobs
 * @returns number (0-11)
 */
const busiestMonth = (jobs) => {
  let allmonth = [];
  let countMonth = [];
  let checkedMonth = [];

  for (let job of jobs) {
    allmonth.push(job.startDate.getMonth());
  }
  for (let element of allmonth) {
    if (!checkedMonth.includes(element)) {
      let count = 0;
      for (let index of allmonth) {
        if (index === element) {
          count++;
        }
      }
      countMonth.push({ element: element, count: count });
      checkedMonth.push(element);
    }
  }
  let maxCount = 0;
  for (let obj of countMonth) {
    if (obj.count > maxCount) {
      maxCount = obj.count;
    }
  }
  const busyMonth = [];
  for (let obj of countMonth) {
    if (obj.count === maxCount) {
      busyMonth.push(obj.element - 1);
    }
  }
  return busyMonth;
};

/**
 * Return the skill name that is required the most in the given list of Jobs,
 * indicated by the requiredSkills property of each Job.
 *
 * @param {Array<Job>} jobs
 */
const mostInDemandSkill = (jobs) => {
  let allSkill = [];
  let countedElement = [];
  let checkedElement = [];

  for (let job of jobs) {
    for (let skill of job.requiredSkills) {
      allSkill.push(skill.name);
    }
  }
  console.log(allSkill);
  for (let element of allSkill) {
    if (checkedElement.includes(element) === false) {
      let count = 0;
      for (let index of allSkill) {
        if (index.toLowerCase() === element.toLowerCase()) {
          count++;
        }
      }
      countedElement.push({ element: element, count: count });
      checkedElement.push(element);
    }
  }

  let maxCount = 0;
  for (let obj of countedElement) {
    if (obj.count > maxCount) {
      maxCount = obj.count;
    }
  }
  const mostDemand = [];
  for (let obj of countedElement) {
    if (obj.count === maxCount) {
      mostDemand.push(obj.element);
    }
  }
  return mostDemand;
};

export {
  filterByDate,
  filterByBornAfter,
  orderBySkills,
  orderByWeightedSkills,
  genderRatio,
  busiestMonth,
  mostInDemandSkill,
};
