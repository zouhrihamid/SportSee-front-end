import { useState, useEffect } from 'react';

const baseUrl = 'http://localhost:3000/user/';

export function useDataPerformance(id, ismocked) {
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

                        const user = mockData.find((user) => user.userId === Number(id));

                        setState({
                              data: user,
                        });
                  } else {
                        try {
                              const response = await fetch(`${baseUrl}${id}/performance`);
                              const result = await response.json();

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
      console.log('performance', state);
      return state;
}
