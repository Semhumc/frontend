import React, { useState, useEffect } from 'react';
import { ShoppingCart, Loader2, CheckCircle, XCircle, Play } from 'lucide-react';

const BrowserAutomationComponent = ({ missingIngredients }) => {
  const [selectedMarket, setSelectedMarket] = useState('yemeksepeti');
  const [automationStatus, setAutomationStatus] = useState('idle'); // idle, running, completed, failed
  const [taskId, setTaskId] = useState(null);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState(null);
  const [pollingInterval, setPollingInterval] = useState(null);

  const markets = [
    { id: 'yemeksepeti', name: 'Yemeksepeti Market', supported: true, icon: '🛒', color: '#dc2626' },
    { id: 'getir', name: 'Getir', supported: false, icon: '🚀', color: '#dc2626' },
    { id: 'migros', name: 'Migros', supported: false, icon: '🏪', color: '#ea580c' }
  ];

  // Task durumunu kontrol et
  const checkTaskStatus = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/browser/status/${id}`);
      const data = await response.json();

      if (data.success) {
        setProgress(data.progress);
        setAutomationStatus(data.status);

        if (data.status === 'completed' || data.status === 'failed') {
          setResult(data.result);
          clearInterval(pollingInterval);
          setPollingInterval(null);
        }
      }
    } catch (error) {
      console.error('Status check error:', error);
    }
  };

  // Otomasyonu başlat
  const startAutomation = async () => {
    if (missingIngredients.length === 0) {
      alert('Sepete eklenecek malzeme yok!');
      return;
    }

    setAutomationStatus('running');
    setProgress(0);
    setResult(null);

    try {
      const response = await fetch('http://localhost:5000/api/browser/automate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ingredients: missingIngredients,
          market: selectedMarket
        })
      });

      const data = await response.json();

      if (data.success) {
        setTaskId(data.task_id);

        // Polling başlat
        const interval = setInterval(() => {
          checkTaskStatus(data.task_id);
        }, 2000);

        setPollingInterval(interval);
      } else {
        setAutomationStatus('failed');
        setResult({ error: data.error });
      }
    } catch (error) {
      console.error('Automation start error:', error);
      setAutomationStatus('failed');
      setResult({ error: error.message });
    }
  };

  // Cleanup
  useEffect(() => {
    return () => {
      if (pollingInterval) {
        clearInterval(pollingInterval);
      }
    };
  }, [pollingInterval]);

  const styles = {
    container: {
      backgroundColor: 'white',
      padding: '24px',
      borderRadius: '8px',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
      marginBottom: '20px'
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '20px'
    },
    icon: {
      width: '32px',
      height: '32px',
      color: '#2563eb',
      marginRight: '12px'
    },
    title: {
      fontSize: '1.25rem',
      fontWeight: '600',
      color: '#1f2937'
    },
    marketGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '12px',
      marginBottom: '24px'
    },
    marketCard: {
      padding: '16px',
      border: '2px solid #d1d5db',
      borderRadius: '8px',
      cursor: 'pointer',
      transition: 'all 0.2s',
      textAlign: 'center'
    },
    marketCardSelected: {
      borderColor: '#2563eb',
      backgroundColor: '#eff6ff'
    },
    marketCardDisabled: {
      opacity: 0.5,
      cursor: 'not-allowed'
    },
    marketEmoji: {
      fontSize: '2rem',
      marginBottom: '8px'
    },
    marketName: {
      fontWeight: '600',
      color: '#1f2937'
    },
    badge: {
      display: 'inline-block',
      padding: '2px 8px',
      borderRadius: '12px',
      fontSize: '0.75rem',
      marginTop: '4px'
    },
    badgeSuccess: {
      backgroundColor: '#d1fae5',
      color: '#065f46'
    },
    badgeWarning: {
      backgroundColor: '#fef3c7',
      color: '#92400e'
    },
    ingredientsList: {
      backgroundColor: '#f9fafb',
      padding: '16px',
      borderRadius: '8px',
      marginBottom: '20px'
    },
    ingredientsTitle: {
      fontSize: '0.875rem',
      fontWeight: '600',
      color: '#374151',
      marginBottom: '8px'
    },
    ingredientTags: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '8px'
    },
    ingredientTag: {
      backgroundColor: '#e5e7eb',
      color: '#374151',
      padding: '4px 12px',
      borderRadius: '16px',
      fontSize: '0.875rem'
    },
    button: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      width: '100%',
      padding: '12px 24px',
      borderRadius: '8px',
      border: 'none',
      cursor: 'pointer',
      fontWeight: '500',
      fontSize: '1rem',
      transition: 'background-color 0.2s'
    },
    buttonPrimary: {
      backgroundColor: '#2563eb',
      color: 'white'
    },
    buttonDisabled: {
      backgroundColor: '#d1d5db',
      color: '#9ca3af',
      cursor: 'not-allowed'
    },
    progressContainer: {
      marginTop: '20px',
      padding: '16px',
      backgroundColor: '#eff6ff',
      borderRadius: '8px'
    },
    progressBar: {
      width: '100%',
      height: '8px',
      backgroundColor: '#e5e7eb',
      borderRadius: '4px',
      overflow: 'hidden',
      marginBottom: '12px'
    },
    progressFill: {
      height: '100%',
      backgroundColor: '#2563eb',
      transition: 'width 0.3s ease'
    },
    statusText: {
      textAlign: 'center',
      color: '#1e40af',
      fontSize: '0.875rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px'
    },
    resultContainer: {
      marginTop: '20px',
      padding: '16px',
      borderRadius: '8px'
    },
    resultSuccess: {
      backgroundColor: '#f0fdf4',
      border: '1px solid #10b981'
    },
    resultError: {
      backgroundColor: '#fef2f2',
      border: '1px solid #ef4444'
    },
    resultTitle: {
      fontWeight: '600',
      marginBottom: '12px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    resultList: {
      fontSize: '0.875rem'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <ShoppingCart style={styles.icon} />
        <h3 style={styles.title}>Otomatik Sepete Ekleme</h3>
      </div>

      {/* Market Seçimi */}
      <div style={styles.marketGrid}>
        {markets.map(market => (
          <div
            key={market.id}
            onClick={() => market.supported && setSelectedMarket(market.id)}
            style={{
              ...styles.marketCard,
              ...(selectedMarket === market.id ? styles.marketCardSelected : {}),
              ...(!market.supported ? styles.marketCardDisabled : {})
            }}
          >
            <div style={styles.marketEmoji}>{market.icon}</div>
            <div style={styles.marketName}>{market.name}</div>
            <div style={{
              ...styles.badge,
              ...(market.supported ? styles.badgeSuccess : styles.badgeWarning)
            }}>
              {market.supported ? 'Destekleniyor' : 'Yakında'}
            </div>
          </div>
        ))}
      </div>

      {/* Malzemeler Listesi */}
      {missingIngredients.length > 0 && (
        <div style={styles.ingredientsList}>
          <div style={styles.ingredientsTitle}>
            Sepete Eklenecek Malzemeler ({missingIngredients.length})
          </div>
          <div style={styles.ingredientTags}>
            {missingIngredients.map((ingredient, index) => (
              <span key={index} style={styles.ingredientTag}>
                {ingredient}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Başlat Butonu */}
      <button
        onClick={startAutomation}
        disabled={automationStatus === 'running' || missingIngredients.length === 0}
        style={{
          ...styles.button,
          ...(automationStatus === 'running' || missingIngredients.length === 0
            ? styles.buttonDisabled
            : styles.buttonPrimary)
        }}
      >
        {automationStatus === 'running' ? (
          <>
            <Loader2 style={{ width: '20px', height: '20px', animation: 'spin 1s linear infinite' }} />
            <span>Sepete Ekleniyor...</span>
          </>
        ) : (
          <>
            <Play style={{ width: '20px', height: '20px' }} />
            <span>Otomatik Sepete Ekle</span>
          </>
        )}
      </button>

      {/* Progress Bar */}
      {automationStatus === 'running' && (
        <div style={styles.progressContainer}>
          <div style={styles.progressBar}>
            <div style={{ ...styles.progressFill, width: `${progress}%` }} />
          </div>
          <div style={styles.statusText}>
            <Loader2 style={{ width: '16px', height: '16px', animation: 'spin 1s linear infinite' }} />
            <span>İlerleme: {progress}% - Malzemeler aranıyor ve sepete ekleniyor...</span>
          </div>
        </div>
      )}

      {/* Sonuç */}
      {result && automationStatus === 'completed' && (
        <div style={{ ...styles.resultContainer, ...styles.resultSuccess }}>
          <div style={{ ...styles.resultTitle, color: '#065f46' }}>
            <CheckCircle style={{ width: '20px', height: '20px' }} />
            <span>Otomasyon Tamamlandı!</span>
          </div>
          <div style={styles.resultList}>
            <p>✅ Eklenen: {result.total_added} malzeme</p>
            {result.added_items && result.added_items.length > 0 && (
              <ul>
                {result.added_items.map((item, idx) => (
                  <li key={idx}>{item.name} - {item.price}</li>
                ))}
              </ul>
            )}
            {result.failed_items && result.failed_items.length > 0 && (
              <>
                <p>❌ Eklenemedi: {result.failed_items.length} malzeme</p>
                <ul>
                  {result.failed_items.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
      )}

      {result && automationStatus === 'failed' && (
        <div style={{ ...styles.resultContainer, ...styles.resultError }}>
          <div style={{ ...styles.resultTitle, color: '#991b1b' }}>
            <XCircle style={{ width: '20px', height: '20px' }} />
            <span>Otomasyon Başarısız</span>
          </div>
          <div style={styles.resultList}>
            <p>{result.error || 'Bilinmeyen bir hata oluştu'}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default BrowserAutomationComponent;