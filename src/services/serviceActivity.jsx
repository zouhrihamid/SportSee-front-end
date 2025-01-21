import { useState, useEffect } from 'react';

const baseUrl = 'http://localhost:3000/user/';
export function useDataActivity(id, ismocked) {
      const [state, setState] = useState({
            data: null,
      });

      useEffect(() => {
            async function fetchData() {
                  setState({ data: null });

                  if (ismocked) {
                        const mockData = [
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

                        const user = mockData.find((user) => user.userId === Number(id));
                        console.log('Filtered mock user:', user);

                        setState({
                              data: user,
                        });
                  } else {
                        try {
                              console.log('Fetching data from API...');
                              const response = await fetch(`${baseUrl}${id}/activity`);
                              const result = await response.json();

                              console.log('API response:', result);
                              if (result.data) {
                                    setState({ data: result.data });
                              } else {
                                    setState({
                                          data: null,
                                    });
                              }
                        } catch (err) {
                              console.error('Error fetching data:', err);
                              setState({ data: null });
                        }
                  }
            }

            fetchData();
      }, [id, ismocked]);

      return state;
}
