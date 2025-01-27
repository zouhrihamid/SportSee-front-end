import { useState, useEffect } from 'react';

const baseUrl = 'http://localhost:3000/user/';

export function useGetAllData(userId, isMocked) {
      const [state, setState] = useState({
            data: null,
      });

      useEffect(() => {
            async function fetchData() {
                  setState({ data: null });

                  try {
                        if (isMocked) {
                              const mockUserData = [
                                    {
                                          id: 12,
                                          userInfos: { firstName: 'Karl', lastName: 'Dovineau', age: 31 },
                                          todayScore: 0.12,
                                          keyData: {
                                                calorieCount: 1930,
                                                proteinCount: 155,
                                                carbohydrateCount: 290,
                                                lipidCount: 50,
                                          },
                                    },
                                    {
                                          id: 18,
                                          userInfos: { firstName: 'Cecilia', lastName: 'Ratorez', age: 34 },
                                          todayScore: 0.3,
                                          keyData: {
                                                calorieCount: 2500,
                                                proteinCount: 90,
                                                carbohydrateCount: 150,
                                                lipidCount: 120,
                                          },
                                    },
                              ];
                              const mockActivityData = [
                                    {
                                          userId: 12,
                                          sessions: [
                                                { day: '2020-07-01', kilogram: 80, calories: 240 },
                                                { day: '2020-07-02', kilogram: 80, calories: 220 },
                                                { day: '2020-07-03', kilogram: 81, calories: 280 },
                                                { day: '2020-07-04', kilogram: 81, calories: 290 },
                                                { day: '2020-07-05', kilogram: 80, calories: 160 },
                                                { day: '2020-07-06', kilogram: 78, calories: 162 },
                                                { day: '2020-07-07', kilogram: 76, calories: 390 },
                                          ],
                                    },
                                    {
                                          userId: 18,
                                          sessions: [
                                                { day: '2020-07-01', kilogram: 70, calories: 240 },
                                                { day: '2020-07-02', kilogram: 69, calories: 220 },
                                                { day: '2020-07-03', kilogram: 70, calories: 280 },
                                                { day: '2020-07-04', kilogram: 70, calories: 500 },
                                                { day: '2020-07-05', kilogram: 69, calories: 160 },
                                                { day: '2020-07-06', kilogram: 69, calories: 162 },
                                                { day: '2020-07-07', kilogram: 69, calories: 390 },
                                          ],
                                    },
                              ];
                              const mockAverageData = [
                                    {
                                          userId: 12,
                                          sessions: [
                                                { day: 1, sessionLength: 30 },
                                                { day: 2, sessionLength: 23 },
                                                { day: 3, sessionLength: 45 },
                                                { day: 4, sessionLength: 50 },
                                                { day: 5, sessionLength: 0 },
                                                { day: 6, sessionLength: 0 },
                                                { day: 7, sessionLength: 60 },
                                          ],
                                    },
                                    {
                                          userId: 18,
                                          sessions: [
                                                { day: 1, sessionLength: 30 },
                                                { day: 2, sessionLength: 40 },
                                                { day: 3, sessionLength: 50 },
                                                { day: 4, sessionLength: 30 },
                                                { day: 5, sessionLength: 30 },
                                                { day: 6, sessionLength: 50 },
                                                { day: 7, sessionLength: 50 },
                                          ],
                                    },
                              ];
                              const mockPerformanceData = [
                                    {
                                          userId: 12,
                                          kind: { 1: 'cardio', 2: 'energy', 3: 'endurance', 4: 'strength', 5: 'speed', 6: 'intensity' },
                                          data: [
                                                { value: 80, kind: 1 },
                                                { value: 120, kind: 2 },
                                                { value: 140, kind: 3 },
                                                { value: 50, kind: 4 },
                                                { value: 200, kind: 5 },
                                                { value: 90, kind: 6 },
                                          ],
                                    },
                                    {
                                          userId: 18,
                                          kind: { 1: 'cardio', 2: 'energy', 3: 'endurance', 4: 'strength', 5: 'speed', 6: 'intensity' },
                                          data: [
                                                { value: 200, kind: 1 },
                                                { value: 240, kind: 2 },
                                                { value: 80, kind: 3 },
                                                { value: 80, kind: 4 },
                                                { value: 220, kind: 5 },
                                                { value: 110, kind: 6 },
                                          ],
                                    },
                              ];

                              const user = mockUserData.find((user) => user.id === Number(userId));
                              const activity = mockActivityData.find((activity) => activity.userId === Number(userId));
                              const average = mockAverageData.find((average) => average.userId === Number(userId));
                              const performance = mockPerformanceData.find((performance) => performance.userId === Number(userId));

                              setState({
                                    data: { user, activity, average, performance },
                              });
                        } else {
                              const [user, activity, average, performance] = await Promise.all([
                                    fetch(`${baseUrl}${userId}`).then((res) => res.json()),
                                    fetch(`${baseUrl}${userId}/activity`).then((res) => res.json()),
                                    fetch(`${baseUrl}${userId}/average-sessions`).then((res) => res.json()),
                                    fetch(`${baseUrl}${userId}/performance`).then((res) => res.json()),
                              ]);

                              setState({
                                    data: {
                                          user: user.data,
                                          activity: activity.data,
                                          average: average.data,
                                          performance: performance.data,
                                    },
                              });
                        }
                  } catch (error) {
                        console.error("Une erreur s'est produite :", error);
                        setState({ data: null, error });
                  }
            }

            fetchData();
      }, [userId, isMocked]);

      return state;
}
