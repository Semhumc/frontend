import React, { useState, useEffect } from 'react';
import { ChefHat, Check, ArrowLeft, ArrowRight, ShoppingCart, Utensils, Loader2 } from 'lucide-react';
import BrowserAutomationComponent from './components/BrowserAutomationComponent';

const SmartGroceryApp = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [preferences, setPreferences] = useState({
    calories: 2000,
    cuisine: '',
    allergies: '',
    favorites: '',
    cravings: '',
    notes: ''
  });
  const [aiSuggestions, setAiSuggestions] = useState(null);
  const [selectedMeals, setSelectedMeals] = useState([]);
  const [availableIngredients, setAvailableIngredients] = useState(new Set());
  const [missingIngredients, setMissingIngredients] = useState([]);

  const cuisineOptions = [
    { id: 'turkish', label: 'Türk Mutfağı', icon: '🇹🇷' },
    { id: 'italian', label: 'İtalyan', icon: '🇮🇹' },
    { id: 'asian', label: 'Asya', icon: '🥢' },
    { id: 'mediterranean', label: 'Akdeniz', icon: '🫒' }
  ];

  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: '#f9fafb',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    },
    wrapper: {
      maxWidth: '1000px',
      margin: '0 auto',
      padding: '20px'
    },
    header: {
      textAlign: 'center',
      marginBottom: '40px'
    },
    headerIcon: {
      width: '64px',
      height: '64px',
      color: '#2563eb',
      margin: '0 auto 16px'
    },
    title: {
      fontSize: '2rem',
      fontWeight: 'bold',
      color: '#1f2937',
      marginBottom: '8px'
    },
    subtitle: {
      color: '#6b7280',
      fontSize: '1.1rem'
    },
    progressContainer: {
      marginBottom: '40px'
    },
    progressSteps: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '8px'
    },
    progressStep: {
      width: '32px',
      height: '32px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 'bold'
    },
    progressStepActive: {
      backgroundColor: '#2563eb',
      color: 'white'
    },
    progressStepInactive: {
      backgroundColor: '#d1d5db',
      color: '#6b7280'
    },
    progressBar: {
      width: '100%',
      height: '8px',
      backgroundColor: '#e5e7eb',
      borderRadius: '4px',
      overflow: 'hidden'
    },
    progressFill: {
      height: '100%',
      backgroundColor: '#2563eb',
      transition: 'width 0.3s ease'
    },
    loadingContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '40px',
      backgroundColor: 'white',
      borderRadius: '8px',
      marginBottom: '20px'
    },
    loadingIcon: {
      width: '48px',
      height: '48px',
      color: '#2563eb',
      marginBottom: '16px',
      animation: 'spin 1s linear infinite'
    },
    stepContainer: {
      marginBottom: '40px'
    },
    stepHeader: {
      textAlign: 'center',
      marginBottom: '30px'
    },
    stepIcon: {
      width: '64px',
      height: '64px',
      color: '#2563eb',
      margin: '0 auto 16px'
    },
    stepTitle: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      color: '#1f2937',
      marginBottom: '8px'
    },
    stepSubtitle: {
      color: '#6b7280'
    },
    card: {
      backgroundColor: 'white',
      padding: '24px',
      borderRadius: '8px',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
      marginBottom: '20px'
    },
    label: {
      display: 'block',
      fontSize: '0.875rem',
      fontWeight: '500',
      color: '#374151',
      marginBottom: '8px'
    },
    calorieSection: {
      marginBottom: '24px'
    },
    calorieControls: {
      display: 'flex',
      alignItems: 'center',
      gap: '16px'
    },
    calorieValue: {
      fontSize: '1.125rem',
      fontWeight: '600'
    },
    button: {
      padding: '8px 16px',
      borderRadius: '6px',
      border: 'none',
      cursor: 'pointer',
      fontWeight: '500',
      transition: 'background-color 0.2s'
    },
    buttonDanger: {
      backgroundColor: '#ef4444',
      color: 'white'
    },
    buttonSuccess: {
      backgroundColor: '#10b981',
      color: 'white'
    },
    cuisineSection: {
      marginBottom: '24px'
    },
    cuisineGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '12px'
    },
    cuisineButton: {
      padding: '12px',
      border: '2px solid #d1d5db',
      borderRadius: '8px',
      backgroundColor: 'white',
      textAlign: 'left',
      cursor: 'pointer',
      transition: 'all 0.2s',
      display: 'flex',
      alignItems: 'center'
    },
    cuisineButtonSelected: {
      borderColor: '#2563eb',
      backgroundColor: '#eff6ff'
    },
    cuisineIcon: {
      fontSize: '1.5rem',
      marginRight: '8px'
    },
    textareasGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '24px'
    },
    textareaGroup: {},
    textarea: {
      width: '100%',
      padding: '12px',
      border: '1px solid #d1d5db',
      borderRadius: '6px',
      fontSize: '0.875rem',
      resize: 'vertical',
      fontFamily: 'inherit'
    },
    categoryTitle: {
      fontSize: '1.125rem',
      fontWeight: '600',
      color: '#1f2937',
      marginBottom: '16px'
    },
    mealsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '16px'
    },
    mealCard: {
      padding: '16px',
      border: '2px solid #d1d5db',
      borderRadius: '8px',
      cursor: 'pointer',
      transition: 'all 0.2s'
    },
    mealCardSelected: {
      borderColor: '#10b981',
      backgroundColor: '#f0fdf4'
    },
    mealHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: '8px'
    },
    mealName: {
      fontWeight: '600',
      color: '#1f2937',
      margin: 0
    },
    checkIcon: {
      width: '20px',
      height: '20px',
      color: '#10b981'
    },
    mealDescription: {
      fontSize: '0.875rem',
      color: '#6b7280',
      marginBottom: '8px'
    },
    mealCalories: {
      fontSize: '0.875rem',
      fontWeight: '500',
      color: '#2563eb',
      marginBottom: '8px'
    },
    mealIngredients: {
      fontSize: '0.75rem',
      color: '#9ca3af'
    },
    summaryCard: {
      backgroundColor: '#eff6ff',
      padding: '16px',
      borderRadius: '8px',
      border: '1px solid #bfdbfe'
    },
    summaryTitle: {
      fontWeight: '600',
      color: '#1e40af',
      marginBottom: '8px'
    },
    selectedMeals: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '8px',
      marginBottom: '8px'
    },
    selectedMealTag: {
      backgroundColor: '#bfdbfe',
      color: '#1e40af',
      padding: '4px 12px',
      borderRadius: '16px',
      fontSize: '0.875rem'
    },
    totalCalories: {
      fontSize: '0.875rem',
      color: '#1d4ed8'
    },
    mealTitle: {
      fontSize: '1.125rem',
      fontWeight: '600',
      color: '#1f2937',
      marginBottom: '16px'
    },
    ingredientsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '12px'
    },
    ingredientLabel: {
      display: 'flex',
      alignItems: 'center',
      padding: '12px',
      border: '2px solid #d1d5db',
      borderRadius: '8px',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      backgroundColor: 'white',
      position: 'relative'
    },
    ingredientLabelChecked: {
      borderColor: '#10b981',
      backgroundColor: '#f0fdf4'
    },
    checkbox: {
      marginRight: '8px',
      width: '16px',
      height: '16px'
    },
    ingredientText: {
      fontSize: '0.875rem',
      color: '#374151',
      flex: 1
    },
    ingredientCheckIcon: {
      width: '16px',
      height: '16px',
      color: '#10b981',
      marginLeft: '8px'
    },
    missingCard: {
      backgroundColor: '#fef3c7',
      padding: '20px',
      borderRadius: '8px',
      border: '2px solid #f59e0b',
      marginBottom: '20px'
    },
    missingTitle: {
      fontWeight: '600',
      color: '#92400e',
      marginBottom: '12px',
      fontSize: '1.1rem'
    },
    missingIngredients: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '8px'
    },
    missingTag: {
      backgroundColor: '#fde68a',
      color: '#92400e',
      padding: '6px 12px',
      borderRadius: '16px',
      fontSize: '0.875rem',
      fontWeight: '500'
    },
    noMissingText: {
      color: '#10b981',
      fontWeight: '500',
      fontSize: '0.95rem'
    },
    summaryStats: {
      fontSize: '0.875rem',
      color: '#1d4ed8'
    },
    successCard: {
      backgroundColor: '#f0fdf4',
      padding: '24px',
      borderRadius: '8px',
      border: '1px solid #10b981',
      textAlign: 'center'
    },
    successIcon: {
      width: '48px',
      height: '48px',
      color: '#10b981',
      margin: '0 auto 12px'
    },
    successTitle: {
      fontSize: '1.125rem',
      fontWeight: '600',
      color: '#065f46',
      marginBottom: '8px'
    },
    successText: {
      color: '#047857'
    },
    marketsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '24px'
    },
    marketCard: {
      backgroundColor: 'white',
      padding: '24px',
      borderRadius: '8px',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
    },
    marketHeader: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '16px'
    },
    marketIconContainer: {
      backgroundColor: '#fee2e2',
      padding: '8px',
      borderRadius: '8px',
      marginRight: '12px'
    },
    marketEmoji: {
      fontSize: '1.5rem'
    },
    marketName: {
      fontSize: '1.125rem',
      fontWeight: '600',
      color: '#1f2937',
      margin: 0
    },
    marketSubtext: {
      fontSize: '0.875rem',
      color: '#6b7280',
      margin: 0
    },
    ingredientsList: {
      marginBottom: '16px'
    },
    ingredientItem: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '8px 0',
      borderBottom: '1px solid #f3f4f6',
      fontSize: '0.875rem',
      color: '#374151'
    },
    marketButton: {
      width: '100%',
      padding: '12px 16px',
      color: 'white',
      fontSize: '0.875rem'
    },
    finalSummary: {
      backgroundColor: '#eff6ff',
      padding: '16px',
      borderRadius: '8px',
      border: '1px solid #bfdbfe'
    },
    navigation: {
      display: 'flex',
      justifyContent: 'space-between'
    },
    navButton: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '12px 24px',
      borderRadius: '8px',
      border: 'none',
      cursor: 'pointer',
      fontWeight: '500',
      transition: 'background-color 0.2s'
    },
    navButtonPrimary: {
      backgroundColor: '#2563eb',
      color: 'white'
    },
    navButtonSecondary: {
      backgroundColor: '#6b7280',
      color: 'white'
    },
    extensionStatusCard: {
      backgroundColor: '#f8fafc',
      padding: '16px',
      borderRadius: '8px',
      border: '1px solid #e2e8f0',
      marginBottom: '24px'
    },
    extensionStatus: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px'
    },
    extensionActive: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      color: '#10b981',
      fontWeight: '500'
    },
    extensionInactive: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      color: '#f59e0b'
    },
    extensionIcon: {
      width: '20px',
      height: '20px'
    },
    warningIcon: {
      fontSize: '20px'
    },
    extensionNote: {
      fontSize: '0.85rem',
      color: '#6b7280',
      margin: 0
    },
    yemeksepeti: {
      marginBottom: '24px'
    },
    yemeksepetiCard: {
      backgroundColor: 'white',
      padding: '24px',
      borderRadius: '12px',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      border: '2px solid #ff6b35'
    },
    yemeksepetiIconContainer: {
      backgroundColor: '#fff2f0',
      padding: '12px',
      borderRadius: '8px',
      marginRight: '16px'
    },
    yemeksepetiEmoji: {
      fontSize: '1.8rem'
    },
    yemeksepetiTitle: {
      fontSize: '1.25rem',
      fontWeight: '700',
      color: '#ff6b35',
      margin: 0
    },
    ingredientsTitle: {
      fontSize: '1rem',
      fontWeight: '600',
      color: '#1f2937',
      marginBottom: '12px'
    },
    ingredientsPreview: {
      backgroundColor: '#f9fafb',
      padding: '16px',
      borderRadius: '8px',
      border: '1px solid #e5e7eb',
      marginBottom: '20px',
      maxHeight: '200px',
      overflowY: 'auto'
    },
    ingredientPreviewItem: {
      display: 'flex',
      alignItems: 'center',
      padding: '6px 0',
      borderBottom: '1px solid #f3f4f6'
    },
    ingredientNumber: {
      color: '#6b7280',
      fontWeight: '500',
      marginRight: '8px',
      minWidth: '20px'
    },
    ingredientName: {
      color: '#374151',
      fontSize: '0.9rem'
    },
    yemeksepetiButton: {
      width: '100%',
      padding: '16px 20px',
      backgroundColor: '#ff6b35',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      fontSize: '1rem',
      fontWeight: '600',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      transition: 'background-color 0.2s ease',
      marginBottom: '20px'
    },
    buttonIcon: {
      width: '20px',
      height: '20px'
    },
    howItWorks: {
      backgroundColor: '#f8fafc',
      padding: '16px',
      borderRadius: '8px',
      border: '1px solid #e2e8f0'
    },
    howItWorksTitle: {
      fontSize: '0.9rem',
      fontWeight: '600',
      color: '#374151',
      marginBottom: '8px'
    },
    howItWorksList: {
      margin: 0,
      paddingLeft: '0',
      listStyle: 'none'
    },
    extensionDownloadCard: {
      backgroundColor: '#eff6ff',
      padding: '20px',
      borderRadius: '8px',
      border: '1px solid #bfdbfe',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    extensionDownloadHeader: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px'
    },
    extensionDownloadIcon: {
      fontSize: '24px'
    },
    extensionDownloadTitle: {
      fontSize: '1.1rem',
      fontWeight: '600',
      color: '#1e40af',
      margin: 0
    },
    extensionDownloadText: {
      fontSize: '0.875rem',
      color: '#3b82f6',
      margin: 0
    },
    navButtonDisabled: {
      backgroundColor: '#d1d5db',
      color: '#9ca3af',
      cursor: 'not-allowed'
    }
  };

  // Eksik malzemeleri real-time hesapla
  useEffect(() => {
    if (selectedMeals.length > 0) {
      calculateMissingIngredientsRealTime();
    }
  }, [availableIngredients, selectedMeals]);

  // API'den yemek önerilerini al
  const fetchMealSuggestions = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/meals/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          preferences: preferences
        })
      });

      if (response.ok) {
        const data = await response.json();
        setAiSuggestions(data);
      } else {
        console.error('API Error:', response.status);
        setAiSuggestions(getFallbackSuggestions());
      }
    } catch (error) {
      console.error('Fetch Error:', error);
      setAiSuggestions(getFallbackSuggestions());
    } finally {
      setLoading(false);
    }
  };

  // Fallback data (API çalışmazsa)
  const getFallbackSuggestions = () => ({
    starter: [
      {
        id: 1,
        name: "Mercimek Çorbası",
        calories: 180,
        ingredients: ["kırmızı mercimek", "soğan", "havuç", "tereyağı", "un", "tavuk suyu"],
        description: "Geleneksel Türk çorbası"
      },
      {
        id: 2,
        name: "Ezogelin Çorbası",
        calories: 160,
        ingredients: ["kırmızı mercimek", "bulgur", "domates salçası", "soğan", "nane", "kırmızı biber"],
        description: "Antep yöresine özgü lezzetli çorba"
      }
    ],
    main: [
      {
        id: 3,
        name: "Tavuk Şiş",
        calories: 320,
        ingredients: ["tavuk göğsü", "soğan", "biber", "domates", "zeytinyağı", "baharat"],
        description: "Mangalda pişirilmiş tavuk şiş"
      },
      {
        id: 4,
        name: "Karnıyarık",
        calories: 280,
        ingredients: ["patlıcan", "kıyma", "soğan", "domates", "biber", "maydanoz"],
        description: "Fırında pişirilmiş geleneksel yemek"
      }
    ],
    side: [
      {
        id: 5,
        name: "Pilav",
        calories: 220,
        ingredients: ["pirinç", "tereyağı", "tuz", "su"],
        description: "Klasik Türk pilavı"
      }
    ],
    dessert: [
      {
        id: 6,
        name: "Sütlaç",
        calories: 200,
        ingredients: ["süt", "pirinç", "şeker", "tarçın"],
        description: "Geleneksel Türk tatlısı"
      }
    ]
  });

  // Real-time eksik malzeme hesaplaması (API'siz)
  const calculateMissingIngredientsRealTime = () => {
    const allIngredients = new Set();
    selectedMeals.forEach(meal =>
      meal.ingredients.forEach(ingredient => allIngredients.add(ingredient))
    );

    const missing = Array.from(allIngredients).filter(ingredient =>
      !availableIngredients.has(ingredient)
    );

    setMissingIngredients(missing);
  };

  // Eksik malzemeleri API ile hesapla (opsiyonel - API çalışırsa)
  const calculateMissingIngredientsAPI = async () => {
    if (selectedMeals.length === 0) return;

    try {
      // selectedMeals array'ini backend'in beklediği formata çevir
      const mealsForAPI = selectedMeals.reduce((acc, meal) => {
        // Her meal'i uygun kategoriye koy
        const category = getCategoryForMeal(meal.id);
        if (!acc[category]) acc[category] = [];
        acc[category].push(meal);
        return acc;
      }, {});

      const response = await fetch('http://localhost:5000/api/ingredients/missing', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ai_response: mealsForAPI,
          pantry: Array.from(availableIngredients)
        })
      });

      if (response.ok) {
        const data = await response.json();
        setMissingIngredients(data.missing_ingredients || []);
      } else {
        // API başarısız olursa real-time hesaplama kullan
        calculateMissingIngredientsRealTime();
      }
    } catch (error) {
      console.error('Missing ingredients API Error:', error);
      // Hata durumunda real-time hesaplama kullan
      calculateMissingIngredientsRealTime();
    }
  };

  // Meal ID'sine göre kategori belirle (basit mapping)
  const getCategoryForMeal = (mealId) => {
    if (mealId <= 2) return 'starter';
    if (mealId <= 4) return 'main';
    if (mealId <= 6) return 'side';
    return 'dessert';
  };

  const handleMealSelect = (meal) => {
    setSelectedMeals(prev => {
      if (prev.find(m => m.id === meal.id)) {
        return prev.filter(m => m.id !== meal.id);
      }
      return [...prev, meal];
    });
  };

  const toggleIngredient = (ingredient) => {
    setAvailableIngredients(prev => {
      const newSet = new Set(prev);
      if (newSet.has(ingredient)) {
        newSet.delete(ingredient);
      } else {
        newSet.add(ingredient);
      }
      return newSet;
    });
  };

  const getAllIngredients = () => {
    const all = new Set();
    selectedMeals.forEach(meal =>
      meal.ingredients.forEach(ingredient => all.add(ingredient))
    );
    return Array.from(all);
  };

  const nextStep = async () => {
    if (currentStep === 1 && preferences.cuisine) {
      await fetchMealSuggestions();
    }

    if (currentStep === 2 && selectedMeals.length > 0) {
      // Step 3'e geçerken initial calculation yap
      calculateMissingIngredientsRealTime();
    }

    if (currentStep < 4) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(prev => prev - 1);
  };

  const isNextDisabled = () => {
    if (currentStep === 1) return !preferences.cuisine || loading;
    if (currentStep === 2) return selectedMeals.length === 0;
    return false;
  };

  // Step 1: Tercihler
  const renderStep1 = () => (
    <div style={styles.stepContainer}>
      <div style={styles.stepHeader}>
        <Utensils style={styles.stepIcon} />
        <h2 style={styles.stepTitle}>Tercihlerinizi Belirleyin</h2>
        <p style={styles.stepSubtitle}>Size özel yemek önerileri için tercihlerinizi paylaşın</p>
      </div>

      <div style={styles.card}>
        <div style={styles.calorieSection}>
          <label style={styles.label}>
            Günlük Kalori Hedefi: {preferences.calories} kcal
          </label>
          <div style={styles.calorieControls}>
            <button
              onClick={() => setPreferences({ ...preferences, calories: Math.max(1200, preferences.calories - 100) })}
              style={{ ...styles.button, ...styles.buttonDanger }}
            >
              -100
            </button>
            <span style={styles.calorieValue}>{preferences.calories}</span>
            <button
              onClick={() => setPreferences({ ...preferences, calories: Math.min(3000, preferences.calories + 100) })}
              style={{ ...styles.button, ...styles.buttonSuccess }}
            >
              +100
            </button>
          </div>
        </div>

        <div style={styles.cuisineSection}>
          <label style={styles.label}>Mutfak Tercihi:</label>
          <div style={styles.cuisineGrid}>
            {cuisineOptions.map(option => (
              <button
                key={option.id}
                onClick={() => setPreferences({ ...preferences, cuisine: option.id })}
                style={{
                  ...styles.cuisineButton,
                  ...(preferences.cuisine === option.id ? styles.cuisineButtonSelected : {})
                }}
              >
                <span style={styles.cuisineIcon}>{option.icon}</span>
                <span>{option.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div style={styles.textareasGrid}>
          <div style={styles.textareaGroup}>
            <label style={styles.label}>Alerjileriniz:</label>
            <textarea
              value={preferences.allergies}
              onChange={(e) => setPreferences({ ...preferences, allergies: e.target.value })}
              style={styles.textarea}
              placeholder="Örn: Fındık, süt ürünleri..."
              rows="3"
            />
          </div>

          <div style={styles.textareaGroup}>
            <label style={styles.label}>Sevdiğiniz Yemekler:</label>
            <textarea
              value={preferences.favorites}
              onChange={(e) => setPreferences({ ...preferences, favorites: e.target.value })}
              style={styles.textarea}
              placeholder="Örn: Köfte, makarna, salata..."
              rows="3"
            />
          </div>

          <div style={styles.textareaGroup}>
            <label style={styles.label}>Canınızın Çektiği:</label>
            <textarea
              value={preferences.cravings}
              onChange={(e) => setPreferences({ ...preferences, cravings: e.target.value })}
              style={styles.textarea}
              placeholder="Örn: Tatlı, acılı, sıcak çorba..."
              rows="3"
            />
          </div>

          <div style={styles.textareaGroup}>
            <label style={styles.label}>Ek Notlar:</label>
            <textarea
              value={preferences.notes}
              onChange={(e) => setPreferences({ ...preferences, notes: e.target.value })}
              style={styles.textarea}
              placeholder="Diğer tercihleriniz..."
              rows="3"
            />
          </div>
        </div>
      </div>
    </div>
  );

  // Step 2: Yemek Seçimi
  const renderStep2 = () => (
    <div style={styles.stepContainer}>
      <div style={styles.stepHeader}>
        <ChefHat style={styles.stepIcon} />
        <h2 style={styles.stepTitle}>AI Yemek Önerileri</h2>
        <p style={styles.stepSubtitle}>
          {loading ? 'AI yemek önerileri hazırlanıyor...' : 'Tercihlerinize uygun yemekleri seçin'}
        </p>
      </div>

      {loading && (
        <div style={styles.loadingContainer}>
          <Loader2 style={styles.loadingIcon} />
          <p>Tercihlerinize göre özel yemek önerileri hazırlanıyor...</p>
        </div>
      )}

      {!loading && aiSuggestions && Object.entries(aiSuggestions).map(([category, meals]) => (
        <div key={category} style={styles.card}>
          <h3 style={styles.categoryTitle}>
            {category === 'starter' && '🥣 Başlangıç'}
            {category === 'main' && '🍽️ Ana Yemek'}
            {category === 'side' && '🥗 Yan Yemek'}
            {category === 'dessert' && '🍰 Tatlı'}
          </h3>

          <div style={styles.mealsGrid}>
            {meals.map(meal => (
              <div
                key={meal.id}
                onClick={() => handleMealSelect(meal)}
                style={{
                  ...styles.mealCard,
                  ...(selectedMeals.find(m => m.id === meal.id) ? styles.mealCardSelected : {})
                }}
              >
                <div style={styles.mealHeader}>
                  <h4 style={styles.mealName}>{meal.name}</h4>
                  {selectedMeals.find(m => m.id === meal.id) && (
                    <Check style={styles.checkIcon} />
                  )}
                </div>
                <p style={styles.mealDescription}>{meal.description}</p>
                <p style={styles.mealCalories}>{meal.calories} kcal</p>
                <p style={styles.mealIngredients}>
                  Malzemeler: {meal.ingredients.slice(0, 3).join(', ')}
                  {meal.ingredients.length > 3 && '...'}
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}

      {!loading && selectedMeals.length > 0 && (
        <div style={styles.summaryCard}>
          <h4 style={styles.summaryTitle}>Seçilen Yemekler:</h4>
          <div style={styles.selectedMeals}>
            {selectedMeals.map(meal => (
              <span key={meal.id} style={styles.selectedMealTag}>
                {meal.name}
              </span>
            ))}
          </div>
          <p style={styles.totalCalories}>
            Toplam Kalori: {selectedMeals.reduce((sum, meal) => sum + meal.calories, 0)} kcal
          </p>
        </div>
      )}
    </div>
  );

  // Step 3: Malzeme Kontrolü - FİX EDİLDİ
  const renderStep3 = () => (
    <div style={styles.stepContainer}>
      <div style={styles.stepHeader}>
        <Check style={styles.stepIcon} />
        <h2 style={styles.stepTitle}>Malzeme Kontrolü</h2>
        <p style={styles.stepSubtitle}>Hangi malzemelere sahip olduğunuzu işaretleyin</p>
      </div>

      {selectedMeals.map(meal => (
        <div key={meal.id} style={styles.card}>
          <h3 style={styles.mealTitle}>{meal.name}</h3>

          <div style={styles.ingredientsGrid}>
            {meal.ingredients.map(ingredient => (
              <label key={ingredient} style={{
                ...styles.ingredientLabel,
                ...(availableIngredients.has(ingredient) ? styles.ingredientLabelChecked : {})
              }}>
                <input
                  type="checkbox"
                  checked={availableIngredients.has(ingredient)}
                  onChange={() => toggleIngredient(ingredient)}
                  style={styles.checkbox}
                />
                <span style={styles.ingredientText}>{ingredient}</span>
                {availableIngredients.has(ingredient) && (
                  <Check style={styles.ingredientCheckIcon} />
                )}
              </label>
            ))}
          </div>
        </div>
      ))}

      {/* Real-time eksik malzemeler listesi */}
      <div style={styles.missingCard}>
        <h4 style={styles.missingTitle}>
          🛒 Eksik Malzemeler: ({missingIngredients.length})
        </h4>
        {missingIngredients.length === 0 ? (
          <p style={styles.noMissingText}>
            ✅ Tüm malzemeleriniz mevcut! Yemek yapmaya başlayabilirsiniz.
          </p>
        ) : (
          <div style={styles.missingIngredients}>
            {missingIngredients.map(ingredient => (
              <span key={ingredient} style={styles.missingTag}>
                {ingredient}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Özet bilgileri */}
      <div style={styles.summaryCard}>
        <h4 style={styles.summaryTitle}>📊 Özet:</h4>
        <div style={styles.summaryStats}>
          <p>Toplam malzeme sayısı: {getAllIngredients().length}</p>
          <p>Mevcut malzemeler: {availableIngredients.size}</p>
          <p>Eksik malzemeler: {missingIngredients.length}</p>
          <p>Tamamlanma oranı: {getAllIngredients().length > 0 ? Math.round((availableIngredients.size / getAllIngredients().length) * 100) : 0}%</p>
        </div>
      </div>
    </div>
  );

  // YemekSepeti'ne malzemeleri gönder
  const sendToYemekSepeti = () => {
    const ingredientsData = {
      ingredients: missingIngredients,
      timestamp: Date.now(),
      source: 'smart-grocery-app'
    };

    // LocalStorage'a kaydet (extension için)
    localStorage.setItem('pendingIngredients', JSON.stringify(ingredientsData));

    // YemekSepeti Market sayfasını aç
    window.open('https://www.yemeksepeti.com/darkstore/xghk/yemeksepeti-market-celiktepe-istanbul/', '_blank');

    // Extension'a mesaj gönder (eğer yüklüyse)
    if (window.chrome && window.chrome.runtime) {
      window.chrome.runtime.sendMessage(
        'cnielaijhacbljlecidkakmghnfjdpoh', // Extension ID'nizi buraya koyacaksınız
        {
          action: 'addIngredientsToCart',
          ingredients: missingIngredients
        },
        (response) => {
          console.log('Extension response:', response);
        }
      );
    }
  };

  // Extension durumunu kontrol et
  const checkExtensionStatus = () => {
    return window.chrome && window.chrome.runtime;
  };

  // renderStep4 fonksiyonunu güncelleyin:
  const renderStep4 = () => (
    <div style={styles.stepContainer}>
      <div style={styles.stepHeader}>
        <ShoppingCart style={styles.stepIcon} />
        <h2 style={styles.stepTitle}>Online Market Siparişi</h2>
        <p style={styles.stepSubtitle}>Eksik malzemelerinizi otomatik olarak sepete ekleyin</p>
      </div>

      {missingIngredients.length === 0 ? (
        <div style={styles.successCard}>
          <Check style={styles.successIcon} />
          <h3 style={styles.successTitle}>Tebrikler!</h3>
          <p style={styles.successText}>Tüm malzemeleriniz mevcut. Yemek yapmaya başlayabilirsiniz!</p>
        </div>
      ) : (
        <>
          {/* BROWSER AUTOMATION COMPONENT */}
          <BrowserAutomationComponent missingIngredients={missingIngredients} />

          {/* Manuel Seçenekler (Yedek) */}
          <div style={styles.card}>
            <h4 style={{ marginBottom: '16px' }}>Manuel Sipariş Seçenekleri</h4>
            <div style={styles.marketsGrid}>
              <div style={styles.marketCard}>
                <div style={styles.marketHeader}>
                  <div style={styles.marketIconContainer}>
                    <span style={styles.marketEmoji}>🛒</span>
                  </div>
                  <div>
                    <h3 style={styles.marketName}>Getir</h3>
                    <p style={styles.marketSubtext}>Hızlı teslimat</p>
                  </div>
                </div>

                <div style={styles.ingredientsList}>
                  {missingIngredients.map(ingredient => (
                    <div key={ingredient} style={styles.ingredientItem}>
                      <span>{ingredient}</span>
                    </div>
                  ))}
                </div>

                <button style={{ ...styles.button, ...styles.marketButton, backgroundColor: '#dc2626' }}>
                  Getir'de Sepete Ekle
                </button>
              </div>

              <div style={styles.marketCard}>
                <div style={styles.marketHeader}>
                  <div style={styles.marketIconContainer}>
                    <span style={styles.marketEmoji}>🏪</span>
                  </div>
                  <div>
                    <h3 style={styles.marketName}>Migros</h3>
                    <p style={styles.marketSubtext}>Güvenilir alışveriş</p>
                  </div>
                </div>

                <div style={styles.ingredientsList}>
                  {missingIngredients.map(ingredient => (
                    <div key={ingredient} style={styles.ingredientItem}>
                      <span>{ingredient}</span>
                    </div>
                  ))}
                </div>

                <button style={{ ...styles.button, ...styles.marketButton, backgroundColor: '#ea580c' }}>
                  Migros'ta Sepete Ekle
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      <div style={styles.finalSummary}>
        <h4 style={styles.summaryTitle}>Özet:</h4>
        <div style={styles.summaryStats}>
          <p>Seçilen yemek sayısı: {selectedMeals.length}</p>
          <p>Toplam kalori: {selectedMeals.reduce((sum, meal) => sum + meal.calories, 0)} kcal</p>
          <p>Eksik malzeme sayısı: {missingIngredients.length}</p>
        </div>
      </div>
    </div>
  );

  // Extension detection fonksiyonu ekleyin:
  const [extensionInstalled, setExtensionInstalled] = useState(false);

  useEffect(() => {
    // Extension kontrolü
    if (typeof window.chrome !== 'undefined' && window.chrome.runtime && window.chrome.runtime.sendMessage) {
      setExtensionInstalled(true);
    }
  }, []);

  // Malzemeleri extension'a gönderme fonksiyonu:
  const sendToExtension = async (ingredients) => {
    if (!extensionInstalled) {
      alert('Smart Grocery Extension yüklü değil!');
      return;
    }

    try {
      // Extension ID'sini manifest.json'dan alın
      const extensionId = 'cnielaijhacbljlecidkakmghnfjdpoh'; // Gerçek ID ile değiştirin

      const response = await window.chrome.runtime.sendMessage(extensionId, {
        action: 'addIngredientsToCart',
        ingredients: ingredients
      });

      if (response && response.success) {
        alert('Malzemeler extension\'a gönderildi!');
      } else {
        alert('Extension\'a gönderim başarısız!');
      }
    } catch (error) {
      console.error('Extension mesaj gönderme hatası:', error);
      // Alternatif yöntem: localStorage kullan
      localStorage.setItem('pendingIngredients', JSON.stringify({
        ingredients: ingredients,
        timestamp: Date.now()
      }));

      // YemekSepeti'ni aç
      window.open('https://www.yemeksepeti.com/market', '_blank');
    }
  };

  // Button'ları güncelleyin:
  <button
    style={{ ...styles.button, ...styles.marketButton, backgroundColor: '#dc2626' }}
    onClick={() => sendToExtension(missingIngredients)}
  >
    {extensionInstalled ? 'Extension ile Sepete Ekle' : 'YemekSepeti\'nde Sepete Ekle'}
  </button>

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1: return renderStep1();
      case 2: return renderStep2();
      case 3: return renderStep3();
      case 4: return renderStep4();
      default: return renderStep1();
    }
  };



  return (
    <div style={styles.container}>
      <div style={styles.wrapper}>
        {/* Header */}
        <div style={styles.header}>
          <ChefHat style={styles.headerIcon} />
          <h1 style={styles.title}>Akıllı Market Asistanı</h1>
          <p style={styles.subtitle}>AI destekli yemek planlama ve market listesi oluşturucu</p>
        </div>

        {/* Progress Bar */}
        <div style={styles.progressContainer}>
          <div style={styles.progressSteps}>
            {[1, 2, 3, 4].map(step => (
              <div
                key={step}
                style={{
                  ...styles.progressStep,
                  ...(step <= currentStep ? styles.progressStepActive : styles.progressStepInactive)
                }}
              >
                {step}
              </div>
            ))}
          </div>
          <div style={styles.progressBar}>
            <div
              style={{
                ...styles.progressFill,
                width: `${(currentStep / 4) * 100}%`
              }}
            />
          </div>
        </div>

        {/* Content */}
        <div>
          {renderCurrentStep()}
        </div>

        {/* Navigation */}
        <div style={styles.navigation}>
          <button
            onClick={prevStep}
            disabled={currentStep === 1}
            style={{
              ...styles.navButton,
              ...(currentStep === 1 ? styles.navButtonDisabled : styles.navButtonSecondary)
            }}
          >
            <ArrowLeft style={{ width: '16px', height: '16px' }} />
            <span>Geri</span>
          </button>

          <button
            onClick={nextStep}
            disabled={currentStep === 4 || isNextDisabled()}
            style={{
              ...styles.navButton,
              ...(currentStep === 4 || isNextDisabled() ? styles.navButtonDisabled : styles.navButtonPrimary)
            }}
          >
            {loading && <Loader2 style={{ width: '16px', height: '16px', animation: 'spin 1s linear infinite' }} />}
            <span>{currentStep === 4 ? 'Tamamlandı' : loading ? 'Yükleniyor...' : 'İleri'}</span>
            {currentStep !== 4 && !loading && <ArrowRight style={{ width: '16px', height: '16px' }} />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SmartGroceryApp;