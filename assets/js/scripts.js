$(document).ready(function () {
  // Mobile menu functionality
  var $mobileMenuToggle = $('.mobile-menu-toggle');
  var $navMenu = $('.nav-menu');
  
  // Toggle menu function
  function toggleMobileMenu() {
    var isActive = $navMenu.hasClass('active');
    if (isActive) {
      $navMenu.removeClass('active');
      $mobileMenuToggle.removeClass('active').attr('aria-expanded', 'false');
    } else {
      $navMenu.addClass('active');
      $mobileMenuToggle.addClass('active').attr('aria-expanded', 'true');
    }
  }
  
  // Close menu function
  function closeMobileMenu() {
    $navMenu.removeClass('active');
    $mobileMenuToggle.removeClass('active').attr('aria-expanded', 'false');
  }
  
  function initMobileMenu() {
    if ($(window).width() < 1024) {
      $mobileMenuToggle.show();
    } else {
      $mobileMenuToggle.hide();
      closeMobileMenu();
    }
  }
  
  // Mobile menu toggle click handler
  $mobileMenuToggle.on('click', function() {
    if ($(window).width() < 1024) {
      toggleMobileMenu();
    }
  });
  
  // Close menu when clicking on a link
  $navMenu.find('a').on('click', function() {
    closeMobileMenu();
  });
  
  // Close menu when clicking outside
  $(document).on('click', function(e) {
    if ($(window).width() < 1024 && !$(e.target).closest('.header-container').length) {
      closeMobileMenu();
    }
  });
  
  // Initialize mobile menu on page load
  initMobileMenu();
  
  // Initialize the reviews slider
  var prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $slider = $('.section-reviews-slider-container').slick({
    dots: false,
    infinite: true,
    speed: 100,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: !prefersReducedMotion,
    autoplaySpeed: 5000,
    fade: true,
    cssEase: 'linear'
  });

  // Benefits slider - responsive with dots for screens < 1024px
  var $benefitsSlider = $('.section-benefits-container-benefits');
  var benefitsSliderInitialized = false;

  const windowWidth = $(window).width();

  function initBenefitsSlider() {
    if (windowWidth < 1024 && !benefitsSliderInitialized) {
      $benefitsSlider.slick({
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        autoplay: !prefersReducedMotion,
        autoplaySpeed: 4000,
        cssEase: 'ease'
      });
      benefitsSliderInitialized = true;
    } else if (windowWidth >= 1024 && benefitsSliderInitialized) {
      $benefitsSlider.slick('unslick');
      benefitsSliderInitialized = false;
    }
  }

  // Initialize on page load
  initBenefitsSlider();

  // Utilities slider - responsive with dots for screens < 1024px
  var $utilitiesSlider = $('.section-utilities-container-content');
  var utilitiesSliderInitialized = false;

  function initUtilitiesSlider() {
    if ($(window).width() < 1024 && !utilitiesSliderInitialized) {
      $utilitiesSlider.slick({
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        autoplay: !prefersReducedMotion,
        autoplaySpeed: 4000,
        cssEase: 'ease'
      });
      utilitiesSliderInitialized = true;
    } else if ($(window).width() >= 1024 && utilitiesSliderInitialized) {
      $utilitiesSlider.slick('unslick');
      utilitiesSliderInitialized = false;
    }
  }

  // Initialize on page load
  initUtilitiesSlider();

  // Steps slider - responsive with dots for screens < 1024px
  var $stepsSlider = $('.section-steps-container-steps');
  var stepsSliderInitialized = false;

  function initStepsSlider() {
    const currentWidth = $(window).width();
    if (currentWidth < 1024 && !stepsSliderInitialized) {
      // Temporarily remove arrows from DOM so slick only captures step items
      var $removedArrows = $stepsSlider.find('.section-steps-container-steps-item-arrow').detach();
      
      $stepsSlider.slick({
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        autoplay: !prefersReducedMotion,
        autoplaySpeed: 4000,
        cssEase: 'ease'
      });
      
      // Store removed arrows for later restoration
      $stepsSlider.data('removed-arrows', $removedArrows);
      
      stepsSliderInitialized = true;
    } else if (currentWidth >= 1024 && stepsSliderInitialized) {
      $stepsSlider.slick('unslick');
      
      // Restore arrows after unslick
      var $removedArrows = $stepsSlider.data('removed-arrows');
      if ($removedArrows && $removedArrows.length) {
        // Re-insert arrows: first after item 1, second after item 2
        var $items = $stepsSlider.find('.section-steps-container-steps-item');
        $removedArrows.eq(0).insertAfter($items.eq(0));
        $removedArrows.eq(1).insertAfter($items.eq(1));
      }
      
      stepsSliderInitialized = false;
    }
  }

  // Initialize on page load
  initStepsSlider();

  // Reviews pagination slider - responsive with dots for screens < 1024px
  var $reviewsPaginationSlider = $('.section-reviews-slider-pagination');
  var reviewsPaginationSliderInitialized = false;

  // Helper function to move selected item to center on desktop (>= 1024px)
  function centerSelectedPaginationItem() {
    // Only work on desktop when slick is not initialized
    if ($(window).width() >= 1024 && !reviewsPaginationSliderInitialized) {
      var $pagination = $('.section-reviews-slider-pagination');
      var $items = $pagination.children('div');
      
      if ($items.length !== 3) return; // Only work with 3 items
      
      // Find selected item and center item
      var $selectedItem = null;
      var $centerItem = $items.eq(1); // Center is index 1
      var selectedIndex = -1;
      
      $items.each(function(index) {
        if ($(this).find('.section-reviews-slider-pagination-item').hasClass('selected')) {
          $selectedItem = $(this);
          selectedIndex = index;
          return false; // break
        }
      });
      
      // If selected item is not already in center, swap them
      if ($selectedItem && selectedIndex !== 1) {
        // Add animation class to pagination container
        $pagination.addClass('reordering');
        
        // Detach all items to reorder
        var $firstItem = $items.eq(0).detach();
        var $secondItem = $items.eq(1).detach();
        var $thirdItem = $items.eq(2).detach();
        
        // Reorder: selected goes to center (index 1), center goes to selected position
        if (selectedIndex === 0) {
          // Selected was first, center was second
          // New order: center (was second), selected (was first), third
          $pagination.append($secondItem).append($firstItem).append($thirdItem);
        } else if (selectedIndex === 2) {
          // Selected was last, center was second
          // New order: first, selected (was last), center (was second)
          $pagination.append($firstItem).append($thirdItem).append($secondItem);
        }
        
        // Remove animation class after animation completes
        setTimeout(function() {
          $pagination.removeClass('reordering');
        }, 500);
      }
    }
  }

  // Helper function to update selected class on pagination items
  function updatePaginationSelected(index) {
    // Remove selected from all
    $('.section-reviews-slider-pagination-item').removeClass('selected').attr('aria-pressed', 'false');
    
    if (reviewsPaginationSliderInitialized) {
      // When Slick is active, find the original slide (not cloned) and update it
      var $originalSlides = $reviewsPaginationSlider.find('.slick-slide').not('.slick-cloned');
      var $targetSlide = $originalSlides.eq(index);
      if ($targetSlide.length) {
        $targetSlide.find('.section-reviews-slider-pagination-item').addClass('selected').attr('aria-pressed', 'true');
      }
    } else {
      // When Slick is not active, find the correct item by matching content
      // Get the name from the main slider's current slide
      var $currentMainSlide = $slider.find('.slick-slide').not('.slick-cloned').eq(index);
      var currentReviewName = '';
      
      if ($currentMainSlide.length) {
        var slideText = $currentMainSlide.find('p').text();
        // Extract name from slide text (format: "text...Name, Company")
        // Names appear at the end: "Name, Company"
        var nameMatch = slideText.match(/([A-Za-zÀ-ÿÁÉÍÓÚáéíóúâêôãõç\s]+),\s*[A-Za-zÀ-ÿÁÉÍÓÚáéíóúâêôãõç\s-]+$/);
        if (nameMatch) {
          currentReviewName = nameMatch[1].trim();
        }
      }
      
      // Find the pagination item that matches this name
      var $paginationItems = $reviewsPaginationSlider.children('div');
      var $targetDiv = null;
      
      if (currentReviewName) {
        $paginationItems.each(function() {
          var itemName = $(this).find('h4').text().trim();
          if (itemName === currentReviewName) {
            $targetDiv = $(this);
            return false; // break
          }
        });
      }
      
      // Fallback to index if name matching fails
      if (!$targetDiv || $targetDiv.length === 0) {
        $targetDiv = $paginationItems.eq(index);
      }
      
      if ($targetDiv && $targetDiv.length) {
        $targetDiv.find('.section-reviews-slider-pagination-item').addClass('selected').attr('aria-pressed', 'true');
      }
      
      // Move selected item to center on desktop
      centerSelectedPaginationItem();
    }
  }

  function initReviewsPaginationSlider() {
    const currentWidth = $(window).width();
    if (currentWidth < 1024 && !reviewsPaginationSliderInitialized) {
      $reviewsPaginationSlider.slick({
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        autoplay: !prefersReducedMotion,
        autoplaySpeed: 4000,
        cssEase: 'ease'
      });
      
      // Sync main slider when pagination slider changes
      $reviewsPaginationSlider.on('afterChange', function(event, slick, currentSlide) {
        $slider.slick('slickGoTo', currentSlide);
      });
      
      reviewsPaginationSliderInitialized = true;
      
      // Ensure initial selected state is applied
      var currentMainSlide = $slider.slick('slickCurrentSlide') || 0;
      updatePaginationSelected(currentMainSlide);
    } else if (currentWidth >= 1024 && reviewsPaginationSliderInitialized) {
      $reviewsPaginationSlider.slick('unslick');
      reviewsPaginationSliderInitialized = false;
      
      // Restore selected state on original divs and center selected item
      var currentMainSlide = $slider.slick('slickCurrentSlide') || 0;
      updatePaginationSelected(currentMainSlide);
    } else if (currentWidth >= 1024 && !reviewsPaginationSliderInitialized) {
      // On desktop, ensure selected item is centered on initial load
      var currentMainSlide = $slider.slick('slickCurrentSlide') || 0;
      updatePaginationSelected(currentMainSlide);
    }
  }

  // Initialize on page load
  initReviewsPaginationSlider();

  // Re-initialize on window resize
  var resizeTimer;
  $(window).on('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
      initMobileMenu();
      initBenefitsSlider();
      initUtilitiesSlider();
      initStepsSlider();
      initReviewsPaginationSlider();
    }, 250);
  });

  // Handle pagination item clicks
  $(document).on('click', '.section-reviews-slider-pagination-item', function() {
    var $button = $(this);
    var index;
    
    // Identify which review this button represents by matching the name with slider content
    var buttonName = $button.find('h4').text().trim();
    
    if (reviewsPaginationSliderInitialized) {
      // When Slick is active, find which original slide contains this button
      var $parentSlide = $button.closest('.slick-slide');
      if ($parentSlide.hasClass('slick-cloned')) {
        // If it's a clone, we need to find which original it represents
        // Get all original slides and find the one that matches the button content
        var $originalSlides = $reviewsPaginationSlider.find('.slick-slide').not('.slick-cloned');
        $originalSlides.each(function(i) {
          if ($(this).find('h4').text().trim() === buttonName) {
            index = i;
            return false; // break
          }
        });
      } else {
        // Original slide, get its index
        var $originalSlides = $reviewsPaginationSlider.find('.slick-slide').not('.slick-cloned');
        index = $originalSlides.index($parentSlide);
      }
    } else {
      // When Slick is not active, find index by matching name with slider items
      // This ensures we get the correct index even after items are swapped
      var $sliderItems = $slider.find('.slick-slide').not('.slick-cloned');
      $sliderItems.each(function(i) {
        var slideText = $(this).find('p').text();
        // Match by checking if the button name appears in the slide text
        if (slideText.indexOf(buttonName) !== -1) {
          index = i;
          return false; // break
        }
      });
      
      // Fallback to div index if name matching fails
      if (index === undefined) {
        index = $button.closest('div').index();
      }
    }
    
    // Ensure index is valid
    if (index === undefined || index < 0) {
      return;
    }
    
    // Go to the clicked slide in main slider
    $slider.slick('slickGoTo', index);
    
    // Sync pagination slider if active
    if (reviewsPaginationSliderInitialized) {
      $reviewsPaginationSlider.slick('slickGoTo', index);
    }
    
    // Update selected class (this will also center the item on desktop)
    updatePaginationSelected(index);
  });

  // Sync pagination with slider change (useful when autoplay changes slides)
  $slider.on('afterChange', function(event, slick, currentSlide) {
    // Update selected class using helper function
    updatePaginationSelected(currentSlide);
    
    // Sync pagination slider if active
    if (reviewsPaginationSliderInitialized) {
      $reviewsPaginationSlider.slick('slickGoTo', currentSlide);
    }
  });

  // Accordion functionality for projects section
  $('.section-projects-toggle').on('click', function() {
    var $button = $(this);
    var targetId = $button.data('target');
    var $content = $('#' + targetId);
    var $plusIcon = $button.find('.icon-plus');
    var $minusIcon = $button.find('.icon-minus');
    var isOpen = $content.hasClass('accordion-open');

    // Close all other accordions
    $('.section-projects-item-content').removeClass('accordion-open').addClass('accordion-closed');
    $('.section-projects-toggle').attr('aria-expanded', 'false');
    
    // Reset all icons
    $('.icon-plus').show();
    $('.icon-minus').hide();

    // Toggle current accordion
    if (isOpen) {
      // Close current accordion
      $content.removeClass('accordion-open').addClass('accordion-closed');
      $plusIcon.show();
      $minusIcon.hide();
      $button.attr('aria-expanded', 'false');
    } else {
      // Open current accordion
      $content.removeClass('accordion-closed').addClass('accordion-open');
      $plusIcon.hide();
      $minusIcon.show();
      $button.attr('aria-expanded', 'true');
    }
  });

  // Video Modal
  var $videoModal = $('#video-modal');
  var $videoContent = $('#video-modal-content');
  var videoSrc = 'https://www.youtube.com/embed/EtTbS-KdcrE?si=ir_sqjhoZ6VjoGA7&autoplay=1';

  function openVideoModal() {
    var iframe = $('<iframe>', {
      src: videoSrc,
      title: 'YouTube video player',
      frameborder: 0,
      allow: 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share',
      referrerpolicy: 'strict-origin-when-cross-origin',
      allowfullscreen: true,
      css: {
        width: '100%',
        height: '100%',
        display: 'block'
      }
    });
    $videoContent.empty().append(iframe);
    $videoModal.addClass('open').attr('aria-hidden', 'false');
    // Focus close button for accessibility
    $videoModal.find('.video-modal-close').focus();
  }

  function closeVideoModal() {
    $videoModal.removeClass('open').attr('aria-hidden', 'true');
    $videoContent.empty(); // remove iframe to stop video
  }

  $('.section-video-container-thumbnail-play-button').on('click', function() {
    openVideoModal();
  });

  // Close interactions
  $videoModal.on('click', '[data-close="true"]', function() {
    closeVideoModal();
  });

  $(document).on('keydown', function(e) {
    if (e.key === 'Escape' && $videoModal.hasClass('open')) {
      closeVideoModal();
    }
  });

  // Phone mask function
  function applyPhoneMask(input) {
    var $input = $(input);
    var value = $input.val().replace(/\D/g, ''); // Remove tudo que não é dígito
    
    // Limitar a 11 dígitos (DDD + número)
    if (value.length > 11) {
      value = value.substring(0, 11);
    }
    
    // Aplicar máscara conforme o número de dígitos
    if (value.length === 0) {
      $input.val('');
    } else if (value.length <= 2) {
      // Apenas DDD
      $input.val('(' + value);
    } else if (value.length <= 6) {
      // DDD + início do número
      $input.val('(' + value.substring(0, 2) + ') ' + value.substring(2));
    } else if (value.length <= 10) {
      // Telefone fixo: (XX) XXXX-XXXX
      $input.val('(' + value.substring(0, 2) + ') ' + value.substring(2, 6) + '-' + value.substring(6));
    } else {
      // Celular: (XX) XXXXX-XXXX
      $input.val('(' + value.substring(0, 2) + ') ' + value.substring(2, 7) + '-' + value.substring(7));
    }
  }

  // Apply phone mask on input
  $('#phone').on('input', function() {
    applyPhoneMask(this);
  });

  // Apply phone mask on paste
  $('#phone').on('paste', function(e) {
    var $this = $(this);
    setTimeout(function() {
      applyPhoneMask($this[0]);
    }, 10);
  });

  // Allow navigation keys (backspace, delete, arrows, etc.)
  $('#phone').on('keydown', function(e) {
    // Allow: backspace, delete, tab, escape, enter, home, end, and arrow keys
    if ([8, 9, 27, 13, 46, 35, 36, 37, 38, 39, 40].indexOf(e.keyCode) !== -1 ||
        // Allow Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
        (e.keyCode === 65 && e.ctrlKey === true) ||
        (e.keyCode === 67 && e.ctrlKey === true) ||
        (e.keyCode === 86 && e.ctrlKey === true) ||
        (e.keyCode === 88 && e.ctrlKey === true)) {
      return;
    }
    // Ensure that it is a number and stop the keypress if not
    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
      e.preventDefault();
    }
  });

  // Form submission handler
  $('.section-contact form').on('submit', function(e) {
    e.preventDefault();
    
    var $form = $(this);
    var $submitButton = $form.find('button[type="submit"]');
    var originalButtonText = $submitButton.text();
    
    // Get form data
    var formData = {
      name: $('#name').val().trim(),
      email: $('#email').val().trim(),
      phone: $('#phone').val().trim(),
      message: $('#message').val().trim()
    };
    
    // Validation
    var errors = [];
    
    if (!formData.name) {
      errors.push('Nome é obrigatório');
      $('#name').css('border-color', '#ff0000');
    } else {
      $('#name').css('border-color', '#C3D9FF80');
    }
    
    if (!formData.email) {
      errors.push('Email é obrigatório');
      $('#email').css('border-color', '#ff0000');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.push('Email inválido');
      $('#email').css('border-color', '#ff0000');
    } else {
      $('#email').css('border-color', '#C3D9FF80');
    }
    
    if (formData.phone && formData.phone.replace(/\D/g, '').length < 10) {
      errors.push('Telefone inválido (deve ter pelo menos 10 dígitos)');
      $('#phone').css('border-color', '#ff0000');
    } else {
      $('#phone').css('border-color', '#C3D9FF80');
    }
    
    if (!formData.message) {
      errors.push('Mensagem é obrigatória');
      $('#message').css('border-color', '#ff0000');
    } else {
      $('#message').css('border-color', '#C3D9FF80');
    }
    
    // Show errors if any
    if (errors.length > 0) {
      // Remove previous error messages
      $form.find('.form-error-message').remove();
      
      // Show error message
      var errorHtml = '<div class="form-error-message" style="color: #ff0000; font-family: Inter, sans-serif; font-size: 14px; margin-bottom: 16px; padding: 12px; background-color: #ffebee; border-radius: 4px;">' +
        '<strong>Erro ao enviar:</strong><ul style="margin: 8px 0 0 20px; padding: 0;">';
      errors.forEach(function(error) {
        errorHtml += '<li>' + error + '</li>';
      });
      errorHtml += '</ul></div>';
      
      $form.prepend(errorHtml);
      
      // Scroll to error
      $('html, body').animate({
        scrollTop: $form.offset().top - 100
      }, 300);
      
      return false;
    }
    
    // Remove previous error messages
    $form.find('.form-error-message').remove();
    
    // Disable submit button and show loading state
    $submitButton.prop('disabled', true).text('Enviando...');
    
    // Prepare data for submission
    // Clean phone number (remove mask for backend)
    var cleanPhone = formData.phone.replace(/\D/g, '');
    
    var submissionData = {
      name: formData.name,
      email: formData.email,
      phone: cleanPhone || null,
      message: formData.message
    };
    
    // TODO: Replace with actual API endpoint
    // Example: Send data to your backend API
    // $.ajax({
    //   url: '/api/contact',
    //   method: 'POST',
    //   data: submissionData,
    //   success: function(response) {
    //     showSuccessMessage($form, $submitButton, originalButtonText);
    //   },
    //   error: function(xhr, status, error) {
    //     showErrorMessage($form, $submitButton, originalButtonText, 'Erro ao enviar mensagem. Tente novamente.');
    //   }
    // });
    
    // Simulate API call (remove this when implementing real API)
    setTimeout(function() {
      console.log('Form data to be sent:', submissionData);
      
      // For now, show success message
      showSuccessMessage($form, $submitButton, originalButtonText);
      
      // Reset form after successful submission
      $form[0].reset();
    }, 1000);
  });

  // Helper function to show success message
  function showSuccessMessage($form, $submitButton, originalButtonText) {
    $form.find('.form-error-message').remove();
    
    var successHtml = '<div class="form-success-message" style="color:rgb(30, 165, 72); font-family: Inter, sans-serif; font-size: 14px; margin-bottom: 16px; padding: 12px; background-color: #e8f5e9; border-radius: 4px; border: 1px solid #48F57F;">' +
      '<strong>Mensagem enviada com sucesso!</strong><br>' +
      'Nossa equipe entrará em contato em breve.' +
      '</div>';
    
    $form.prepend(successHtml);
    
    // Reset button
    $submitButton.prop('disabled', false).text(originalButtonText);
    
    // Scroll to success message
    $('html, body').animate({
      scrollTop: $form.offset().top - 100
    }, 300);
    
    // Remove success message after 5 seconds
    setTimeout(function() {
      $form.find('.form-success-message').fadeOut(300, function() {
        $(this).remove();
      });
    }, 5000);
  }

  // Helper function to show error message
  function showErrorMessage($form, $submitButton, originalButtonText, errorMsg) {
    $form.find('.form-error-message, .form-success-message').remove();
    
    var errorHtml = '<div class="form-error-message" style="color: #ff0000; font-family: Inter, sans-serif; font-size: 14px; margin-bottom: 16px; padding: 12px; background-color: #ffebee; border-radius: 4px;">' +
      '<strong>Erro:</strong> ' + errorMsg +
      '</div>';
    
    $form.prepend(errorHtml);
    
    // Reset button
    $submitButton.prop('disabled', false).text(originalButtonText);
    
    // Scroll to error message
    $('html, body').animate({
      scrollTop: $form.offset().top - 100
    }, 300);
  }
});

