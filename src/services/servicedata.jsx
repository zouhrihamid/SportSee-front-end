import { useState, useEffect } from 'react';

const baseUrl = 'http://localhost:3000/user/';

export function useDataUser(id, ismocked) {
      const [state, setState] = useState({
            data: null,
      });

      useEffect(() => {
            console.log('useEffect called with id:', id, ' and ismocked:', ismocked);

            async function fetchData() {
                  setState({ data: null });

                  if (ismocked) {
                        const mockData = [
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

                        const user = mockData.find((user) => user.id === Number(id));
                        console.log('Filtered mock user:', user);

                        setState({
                              data: user,
                        });
                  } else {
                        try {
                              console.log('Fetching data from API...');
                              const response = await fetch(`${baseUrl}${id}`);
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
