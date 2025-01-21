import { useState, useEffect } from 'react';

const baseUrl = 'http://localhost:3000/user/';

export function useDataAverage(id, ismocked) {
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

                        const user = mockData.find((user) => user.userId === Number(id));
                        console.log('Filtered mock user:', user);

                        setState({
                              data: user,
                        });
                  } else {
                        try {
                              console.log('Fetching data from API...');
                              const response = await fetch(`${baseUrl}${id}/average-sessions`);
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
